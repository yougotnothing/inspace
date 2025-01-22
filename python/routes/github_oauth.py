from fastapi.routing import APIRouter
from starlette.responses import RedirectResponse
from models.github_user import GithubToken, GithubUser
from utils.github_client import GithubClient
from utils.keycloak_client import KeycloakClient


router = APIRouter(prefix='/auth/oauth/github')
keycloak_client = KeycloakClient()
github_client = GithubClient()


@router.get('/callback')
def oauth_connect() -> RedirectResponse:
    return github_client.get_authorization_code()


@router.post('/authorize')
def authorize_code(code: str) -> GithubToken:
    data = github_client.verify_authorization_token(code)

    print(data)

    return data


@router.get('/user')
def get_user_data(access_token: str) -> GithubUser:
    return github_client.get_user_data(access_token)
