import os
from fastapi import APIRouter, HTTPException
from models.openid_connect import *
from utils.keycloak_client import KeycloakClient

router = APIRouter(prefix='/auth')
keycloak_client = KeycloakClient()
auth_url = keycloak_client.keycloak_openid.auth_url(redirect_uri=os.getenv('KC_OPENID_REDIRECT_URI'),
                                                    scope=os.getenv('KC_OPENID_SCOPE'),
                                                    state=os.getenv('KC_OPENID_STATE'))

@router.post('/openid-connect/login')
async def openid_connect_login(login_dto: OpenidConnectLoginInputModel):
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
    credentials = keycloak_client.keycloak_openid.token(
      grant_type='password',
      username=login_dto.login,
      password=login_dto.password,
      code=auth_url,
      redirect_uri=os.getenv('KC_REDIRECT_URI')
    )
    
    return {
      'access_token': credentials['access_token'],
      'refresh_token': credentials['refresh_token'],
      'expires_in': credentials['expires_in'],
      'refresh_expires_in': credentials['refresh_expires_in'],
      'session_state': credentials['session_state']
    }
  except Exception as e:
    raise HTTPException(
      status_code=500,
      detail=f'Login failed: {str(e)}'
    )

@router.post('/openid-connect/register')
def openid_connect_register(register_dto: OpenidConnectRegisterInputModel):
  try:
    if register_dto.username == 'admin' and register_dto.password == 'admin':
      raise HTTPException(400, 'Cannot create user with this credentials.')
    
    return keycloak_client.keycloak_admin.create_user({
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
def openid_connect_logout(refresh_token: str):
  try:
    response = keycloak_client.keycloak_openid.logout(refresh_token=refresh_token)
    return response
  except HTTPException as e:
    raise e

@router.patch('/openid-connect/refresh')
def openid_connect_refresh(refresh_token: str):
  print(refresh_token)
  
  try:
    credentials = keycloak_client.keycloak_openid.refresh_token(refresh_token=refresh_token)

    return {
      'access_token': credentials['access_token'],
			'refresh_token': credentials['refresh_token'],
			'expires_in': credentials['expires_in'],
			'refresh_expires_in': credentials['refresh_expires_in'],
      'session_state': credentials['session_state']
    }
  except HTTPException:
    raise HTTPException(status_code=401, detail='Unauthorized')

@router.delete('/openid-connect/delete-user')
def openid_connect_delete_user(username: str):
  try:
    return keycloak_client.keycloak_admin.delete_user(username=username)
  except HTTPException as e:
    raise e
  
@router.get('/openid-connect/userinfo')
def openid_connect_userinfo(access_token: str):
  return keycloak_client.keycloak_openid.userinfo(token=access_token)

@router.post('/openid-connect/callback')
def openid_connect_callback():
  return keycloak_client.keycloak_openid.connection()
