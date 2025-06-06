from typing_extensions import Any
from fastapi import APIRouter
from utils.google_client import flow
from fastapi.responses import RedirectResponse
from google.auth.transport import requests
from google.oauth2 import id_token
from utils.keycloak_client import KeycloakClient


router = APIRouter(prefix='/auth/oauth/google')
keycloak_client = KeycloakClient()


@router.get('/callback')
def oauth_connect() -> RedirectResponse:
    auth_url, state = flow.authorization_url(
        access_type='offline',
        include_granted_scopes='true',
        prompt='consent'
    )

    return RedirectResponse(auth_url)


@router.get('/verify-token')
def verify_auth_token(token: str) -> dict[str, Any]:
    try:
        flow.fetch_token(code=token)

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
