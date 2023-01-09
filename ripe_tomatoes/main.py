from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users, reviews
from authenticator import authenticator

import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(authenticator.router)
app.include_router(reviews.router)
