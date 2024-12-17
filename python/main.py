import uvicorn
from fastapi import FastAPI
from routes import geolocation, openid_connect, google_oauth, github_oauth
from dotenv import load_dotenv


load_dotenv()

api = FastAPI()

api.include_router(openid_connect.router)
api.include_router(geolocation.router)
api.include_router(google_oauth.router)
api.include_router(github_oauth.router)

if __name__ == '__main__':
    uvicorn.run(app=api, reload=True)
