# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import users, auth
from .database import Base, engine

# Crear tablas
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Insightlyzer API")

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router)
app.include_router(users.router)