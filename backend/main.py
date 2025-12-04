from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.staticfiles import StaticFiles
from sqlmodel import Session, select
from typing import List
import os
import shutil
import google.generativeai as genai

from database import create_db_and_tables, get_session
from models import User, News, WikiArticle, Task, LearningCourse
from auth import create_access_token, get_current_user, get_password_hash, verify_password, ACCESS_TOKEN_EXPIRE_MINUTES
from services.system import get_real_stats

# --- App Setup ---
app = FastAPI()

origins = ["*"] # In production, specify domains
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure data directories exist
os.makedirs("data/uploads", exist_ok=True)
app.mount("/files", StaticFiles(directory="data/uploads"), name="files")

@app.on_event("startup")
def on_startup():
    create_db_and_tables()
    # Create default admin if not exists
    with Session(get_session().__next__().bind) as session: # Hacky way to get session from generator
        statement = select(User).where(User.email == "admin@wf-hub.com")
        user = session.exec(statement).first()
        if not user:
            admin = User(
                email="admin@wf-hub.com",
                password_hash=get_password_hash("admin123"),
                full_name="System Admin",
                role="admin"
            )
            session.add(admin)
            session.commit()

# --- Auth Endpoints ---

@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    statement = select(User).where(User.email == form_data.username)
    user = session.exec(statement).first()
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

# --- System Endpoints ---

@app.get("/api/system/stats")
def get_stats(current_user: User = Depends(get_current_user)):
    return get_real_stats()

# --- News Endpoints ---

@app.get("/api/news", response_model=List[News])
def get_news(session: Session = Depends(get_session)):
    return session.exec(select(News).order_by(News.date.desc())).all()

@app.post("/api/news", response_model=News)
def create_news(news: News, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    news.author_id = current_user.id
    session.add(news)
    session.commit()
    session.refresh(news)
    return news

# --- Projects/Tasks Endpoints ---

@app.get("/api/projects")
def get_projects(session: Session = Depends(get_session)):
    tasks = session.exec(select(Task)).all()
    return {
        "todo": [t for t in tasks if t.status == "todo"],
        "inprogress": [t for t in tasks if t.status == "inprogress"],
        "done": [t for t in tasks if t.status == "done"]
    }

@app.post("/api/projects/tasks", response_model=Task)
def create_task(task: Task, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    task.assignee_id = current_user.id # Default to creator
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

@app.put("/api/projects/tasks/{task_id}")
def update_task(task_id: int, task_update: Task, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    task.status = task_update.status
    task.title = task_update.title
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

# --- Wiki Endpoints ---

@app.get("/api/wiki/structure")
def get_wiki_structure(session: Session = Depends(get_session)):
    articles = session.exec(select(WikiArticle)).all()
    # Group by category
    categories = {}
    for art in articles:
        if art.category not in categories:
            categories[art.category] = []
        categories[art.category].append({"id": art.id, "title": art.title})
    
    return [{"category": cat, "articles": arts} for cat, arts in categories.items()]

@app.post("/api/wiki", response_model=WikiArticle)
def create_wiki(article: WikiArticle, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    article.author_id = current_user.id
    session.add(article)
    session.commit()
    session.refresh(article)
    return article

@app.get("/api/wiki/{article_id}", response_model=WikiArticle)
def get_wiki_article(article_id: int, session: Session = Depends(get_session)):
    article = session.get(WikiArticle, article_id)
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article

# --- Files Endpoints ---

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...), current_user: User = Depends(get_current_user)):
    file_location = f"data/uploads/{file.filename}"
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)
    return {"info": f"file '{file.filename}' saved at '{file_location}'"}

@app.get("/api/files")
def list_files(current_user: User = Depends(get_current_user)):
    files = []
    if os.path.exists("data/uploads"):
        for filename in os.listdir("data/uploads"):
            files.append({"name": filename, "url": f"/files/{filename}"})
    return files

# --- Chat Endpoint ---

@app.post("/api/chat")
async def chat_with_gemini(request: dict, current_user: User = Depends(get_current_user)):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return {"response": "Error: GEMINI_API_KEY not set."}
    
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-pro')
    
    try:
        response = model.generate_content(request.get("message", ""))
        return {"response": response.text}
    except Exception as e:
        return {"response": f"Error communicating with Gemini: {str(e)}"}
