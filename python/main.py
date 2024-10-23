from fastapi import FastAPI
from routes import geolocation, openid_connect
from dotenv import load_dotenv

load_dotenv()

api = FastAPI()

api.include_router(openid_connect.router)
api.include_router(geolocation.router)