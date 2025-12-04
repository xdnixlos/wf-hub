from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World", "Service": "WF-HUB Backend"}

# --- Mock Data Endpoints ---

@app.get("/api/news")
def get_news():
    return [
        {
            "id": 1, 
            "title": "WF-HUB Live", 
            "category": "WF-TECH", 
            "date": "2025-12-04", 
            "content": "Das System ist online! Alle Dienste sind verfügbar und laufen stabil."
        },
        {
            "id": 2, 
            "title": "Neues Feature: Kanban", 
            "category": "DEV", 
            "date": "2025-12-03", 
            "content": "Das Projekt-Board ist nun verfügbar. Aufgaben können per Drag & Drop verschoben werden."
        },
        {
            "id": 3, 
            "title": "Wartungsarbeiten", 
            "category": "SYS", 
            "date": "2025-12-01", 
            "content": "Geplante Wartung der Datenbank-Server am kommenden Sonntag."
        },
        {
            "id": 4, 
            "title": "Team Meeting", 
            "category": "ORG", 
            "date": "2025-11-28", 
            "content": "Monatliches All-Hands Meeting im Konferenzraum A."
        }
    ]

@app.get("/api/system/stats")
def get_system_stats():
    return {
        "cpu": 45,
        "ram": 60,
        "disk": 30,
        "containers": [
            {"id": 100, "name": "proxy", "status": "running", "ip": "10.0.0.1"},
            {"id": 105, "name": "wf-hub", "status": "running", "ip": "10.0.0.5"},
            {"id": 106, "name": "db-main", "status": "running", "ip": "10.0.0.6"},
            {"id": 107, "name": "cache-redis", "status": "running", "ip": "10.0.0.7"},
            {"id": 108, "name": "worker-1", "status": "stopped", "ip": "10.0.0.8"}
        ]
    }

@app.get("/api/projects")
def get_projects():
    return {
        "todo": [
            {"id": 1, "title": "SSL Fix", "user": "Admin", "tag": "Security"},
            {"id": 4, "title": "Mobile View", "user": "Designer", "tag": "UI"}
        ],
        "inprogress": [
            {"id": 2, "title": "Deployment", "user": "JJ", "tag": "DevOps"},
            {"id": 5, "title": "API Integration", "user": "Dev", "tag": "Backend"}
        ],
        "done": [
            {"id": 3, "title": "Initial Setup", "user": "Admin", "tag": "Core"}
        ]
    }

@app.get("/api/wiki/structure")
def get_wiki_structure():
    return [
        {
            "category": "Onboarding",
            "articles": [
                {"id": 1, "title": "Erste Schritte"},
                {"id": 2, "title": "Einrichtung Arbeitsplatz"},
                {"id": 3, "title": "Team Vorstellung"}
            ]
        },
        {
            "category": "Server",
            "articles": [
                {"id": 4, "title": "SSH Access"},
                {"id": 5, "title": "Deployment Guide"},
                {"id": 6, "title": "Monitoring"}
            ]
        },
        {
            "category": "Development",
            "articles": [
                {"id": 7, "title": "Coding Guidelines"},
                {"id": 8, "title": "Git Workflow"}
            ]
        }
    ]
