from fastapi import FastAPI
from routes import geolocation, auth
from dotenv import load_dotenv

load_dotenv()

api = FastAPI()

api.include_router(auth.router)
api.include_router(geolocation.router)