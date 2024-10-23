from fastapi import APIRouter, HTTPException
import os
from models.openid_connect import *
from utils.keycloak_openid import keycloak_openid
from utils.keycloak_admin import keycloak_admin

router = APIRouter()

auth_url = keycloak_openid.auth_url(redirect_uri=os.getenv('KC_OPENID_REDIRECT_URI'),
                                    scope=os.getenv('KC_OPENID_SCOPE'),
                                    state=os.getenv('KC_OPENID_STATE'))

@router.post('/openid-connect/login')
def openid_connect_login(login_dto: OpenidConnectLoginInputModel) -> OpenidConnectModel:
  try:
    if login_dto.login == 'admin' and login_dto.password == 'admin':
      raise HTTPException(400, 'Invalid credentials.')

    credentials = keycloak_openid.token(grant_type='password',
                                        username=login_dto.login,
                                        password=login_dto.password,
                                        code=auth_url,
                                        redirect_uri=os.getenv('KC_REDIRECT_URI'))
    
    return {
      'access_token': credentials['access_token'],
      'refresh_token': credentials['refresh_token'],
      'expires_in': credentials['expires_in'],
      'refresh_expires_in': credentials['refresh_expires_in'],
      'session_state': credentials['session_state']
    }
  except HTTPException as e:
    raise e

@router.post('/openid-connect/register')
def openid_connect_register(register_dto: OpenidConnectRegisterInputModel):
  try:
    if register_dto.username == 'admin' and register_dto.password == 'admin':
      raise HTTPException(400, 'Cannot create user with this credentials.')
    
    return keycloak_admin.create_user({
      "username": register_dto.username,
      "email": register_dto.email,
      "enabled": True,
      "credentials": [{
        "value": register_dto.password,
        "type": "password"
      }]
    })
  except Exception as e:
    # Log the full error for debugging
    print(f"Error in user registration: {str(e)}")
    raise HTTPException(status_code=500, detail="Error in user registration")
  
@router.post('/openid-connect/logout')
def openid_connect_logout(refresh_token: str):
  try:
    response = keycloak_openid.logout(refresh_token=refresh_token)
    return response
  except HTTPException as e:
    raise e

@router.patch('/openid-connect/refresh')
def openid_connect_refresh(refresh_token: str) -> OpenidConnectModel:
	try:
		credentials = keycloak_openid.refresh_token(refresh_token=refresh_token)
		
		return {
			'access_token': credentials['access_token'],
			'refresh_token': credentials['refresh_token'],
			'expires_in': credentials['expires_in'],
			'refresh_expires_in': credentials['refresh_expires_in'],
			'session_state': credentials['session_state']
		}
	except HTTPException as e:
		raise e
