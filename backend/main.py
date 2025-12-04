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

@app.get("/api/system/stats")
def get_system_stats():
    return {
        "hetzner": {"cpu": 45, "ram": 32, "disk_io": "120 MB/s", "uptime": "14d 2h"},
        "proxmox": {"cpu": 70, "ram": 85, "disk_io": "450 MB/s", "uptime": "45d 12h"},
        "containers": [
            {"id": 100, "name": "nginx-proxy", "status": "running", "ip": "10.0.0.5"},
            {"id": 101, "name": "db-postgres", "status": "running", "ip": "10.0.0.6"},
            {"id": 102, "name": "app-backend", "status": "running", "ip": "10.0.0.7"},
            {"id": 103, "name": "ci-runner", "status": "stopped", "ip": "10.0.0.8"},
            {"id": 104, "name": "monitoring", "status": "running", "ip": "10.0.0.9"},
        ]
    }

@app.get("/api/news")
def get_news():
    return [
        {"id": 1, "title": "New Server Deployed", "date": "2025-12-04", "category": "WF-TECH", "content": "Hetzner node #4 is now live and serving traffic."},
        {"id": 2, "title": "Partner Meeting", "date": "2025-12-03", "category": "JJ-TECH", "content": "Quarterly review with JJ-Tech partners scheduled."},
        {"id": 3, "title": "Security Patch", "date": "2025-12-02", "category": "WF-TECH", "content": "Applied critical security patches to all edge nodes."},
    ]

@app.get("/api/projects")
def get_projects():
    return {
        "todo": [
            {"id": 1, "title": "Refactor Auth", "tag": "Backend"},
            {"id": 2, "title": "Update Deps", "tag": "Maintenance"},
        ],
        "in_progress": [
            {"id": 3, "title": "Dashboard UI", "tag": "Frontend"},
            {"id": 4, "title": "API Docs", "tag": "Docs"},
        ],
        "done": [
            {"id": 5, "title": "Init Repo", "tag": "DevOps"},
        ]
    }

@app.get("/api/wiki/structure")
def get_wiki_structure():
    return [
        {
            "category": "Infrastructure",
            "articles": ["Server Setup", "Network Topology", "Backup Strategy"]
        },
        {
            "category": "Development",
            "articles": ["Coding Standards", "Git Workflow", "API Guidelines"]
        },
        {
            "category": "Onboarding",
            "articles": ["First Day", "Tools Setup", "Contacts"]
        }
    ]
