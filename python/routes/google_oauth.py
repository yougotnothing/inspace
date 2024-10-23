import os
from fastapi import APIRouter
from keycloak import KeycloakOpenID

router = APIRouter()

keycloak_openid = KeycloakOpenID(server_url=os.getenv('KC_SERVER_URL'),
                                 client_id=os.getenv('KC_GOOGLE_OAUTH_CLIENT_ID'),
                                 client_secret_key=os.getenv('KC_GOOGLE_OAUTH_CLIENT_SECRET'))

auth_url = keycloak_openid.auth_url(redirect_uri=os.getenv('KC_GOOGLE_REDIRECT_URI'),
                                    scope=os.getenv('KC_OPENID_SCOPE'),
                                    state='google')

@router.get('/oauth/google')
def google_oauth():
  try:
    response = keycloak_openid.token()
  except Exception as e:
    raise e
