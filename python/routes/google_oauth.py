from fastapi import APIRouter
from utils.google_client import flow
from fastapi.responses import RedirectResponse
from google.auth.transport import requests
from google.oauth2 import id_token

router = APIRouter()

@router.get('/oauth/auth')
def oauth_connect():
  auth_url, _ = flow.authorization_url()

  return RedirectResponse(auth_url)

@router.get('/oauth/callback')
def verify_auth_token(token: str):
  req = requests.Request()


