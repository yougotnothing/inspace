import os
from keycloak.openid_connection import ConnectionManager
from typing_extensions import Any
from fastapi import APIRouter, HTTPException
from models.openid_connect import *
from utils.keycloak_client import KeycloakClient


router = APIRouter(prefix='/auth')
keycloak_client = KeycloakClient()
auth_url = keycloak_client.openid.auth_url(redirect_uri=os.getenv('KC_OPENID_REDIRECT_URI'),
                                           scope=os.getenv('KC_OPENID_SCOPE') or 'scope',
                                           state=os.getenv('KC_OPENID_STATE') or 'state')


@router.post('/openid-connect/login')
async def openid_connect_login(login_dto: OpenidConnectLoginInputModel) -> OpenidConnectModel:
    if not login_dto.login or not login_dto.password:
        raise HTTPException(
            status_code=422,
            detail='Both login and password are required'
        )

    if login_dto.login == 'admin' and login_dto.password == 'admin':
        raise HTTPException(
            status_code=400,
            detail='Invalid credentials.'
        )

    try:
        credentials = keycloak_client.openid.token(
            grant_type='password',
            username=login_dto.login,
            password=login_dto.password,
            redirect_uri=os.getenv('KC_REDIRECT_URI') or 'redirect'
        )

        return OpenidConnectModel(access_token=credentials['access_token'],
                                  refresh_token=credentials['refresh_token'],
                                  expires_in=int(credentials['expires_in']),
                                  refresh_expires_in=int(credentials['refresh_expires_in']),
                                  session_state=credentials['session_state'])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'Login failed: {str(e)}')


@router.post('/openid-connect/register')
def openid_connect_register(register_dto: OpenidConnectRegisterInputModel) -> str:
    try:
        if register_dto.username == 'admin' and register_dto.password == 'admin':
            raise HTTPException(400, 'Cannot create user with this credentials.')

        return keycloak_client.admin.create_user({
            'username': register_dto.username,
            'email': register_dto.email,
            'enabled': True,
            'credentials': [{
                'value': register_dto.password,
                'type': 'password'
            }]
        })
    except Exception as e:
        raise e


@router.post('/openid-connect/logout')
def openid_connect_logout(refresh_token: str) -> dict:
    try:
        return keycloak_client.openid.logout(refresh_token=refresh_token)
    except HTTPException as e:
        raise e


@router.patch('/openid-connect/refresh')
def openid_connect_refresh(refresh_token: str) -> OpenidConnectModel:
    try:
        credentials = keycloak_client.openid.refresh_token(refresh_token=refresh_token)

        return OpenidConnectModel(access_token=credentials['access_token'],
                                  refresh_token=credentials['refresh_token'],
                                  expires_in=int(credentials['expires_in']),
                                  refresh_expires_in=int(credentials['refresh_expires_in']),
                                  session_state=credentials['session_state'])
    except HTTPException:
        raise HTTPException(status_code=401, detail='Unauthorized')


@router.delete('/openid-connect/delete-user')
def openid_connect_delete_user(access_token: str) -> dict:
    try:
        credentials = keycloak_client.openid.userinfo(token=access_token)

        return keycloak_client.admin.delete_user(credentials['sub'])
    except HTTPException as e:
        raise e


@router.get('/openid-connect/userinfo')
def openid_connect_userinfo(access_token: str) -> dict[Any, Any]:
    userinfo = keycloak_client.openid.userinfo(token=access_token)

    return userinfo


@router.post('/openid-connect/callback')
def openid_connect_callback() -> ConnectionManager:
    return keycloak_client.openid.connection()
