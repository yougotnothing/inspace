import os
from starlette.exceptions import HTTPException
from typing_extensions import cast
from fastapi import APIRouter
from google.oauth2.credentials import Credentials
from utils.google_client import flow
from fastapi.responses import RedirectResponse
from google.auth.transport import requests
from google.oauth2 import id_token
from utils.keycloak_client import KeycloakClient
from models.google_user import *


router = APIRouter(prefix='/auth/oauth')
keycloak_client = KeycloakClient()


@router.get('/auth')
def oauth_connect() -> RedirectResponse:
    auth_url, state = flow.authorization_url(
        access_type='offline',
        include_granted_scopes='true',
        prompt='consent'
    )

    return RedirectResponse(auth_url)


@router.get('/google')
def verify_auth_token(token: str):
    try:
        flow.fetch_token(code=token)

        id_info = id_token.verify_oauth2_token(
            flow.credentials.__dict__.get('_id_token'),
            requests.Request(),
            flow.client_config['client_id'],
            clock_skew_in_seconds=10)

        return {
            "success": True,
            "user_info": id_token.verify_oauth2_token(
                flow.credentials.__dict__.get('_id_token'),
                requests.Request(),
                flow.client_config['client_id'],
                clock_skew_in_seconds=10)
        }
    except Exception as e:
        raise e
