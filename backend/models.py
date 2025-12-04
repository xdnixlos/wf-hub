from typing import Optional, List
from sqlmodel import Field, SQLModel
from datetime import date, datetime

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True)
    password_hash: str
    full_name: Optional[str] = None
    role: str = Field(default="user") # admin, user

class News(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    content: str
    category: str
    date: date = Field(default_factory=date.today)
    author_id: Optional[int] = Field(default=None, foreign_key="user.id")

class WikiArticle(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    content: str
    category: str
    author_id: Optional[int] = Field(default=None, foreign_key="user.id")

class Task(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    status: str = Field(default="todo") # todo, inprogress, done
    assignee_id: Optional[int] = Field(default=None, foreign_key="user.id")
    tag: Optional[str] = None

class LearningCourse(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: str
    progress: int = Field(default=0)
