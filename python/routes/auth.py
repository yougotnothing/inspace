from fastapi import APIRouter, HTTPException
import os
from models.auth import OpenidConnectLoginInputModel, OpenidConnectModel, OpenidConnectRegisterInputModel
from keycloak import KeycloakAdmin, KeycloakOpenIDConnection, KeycloakOpenID

keycloak_admin = KeycloakAdmin(connection=KeycloakOpenIDConnection(
                                            server_url=os.getenv('KC_SERVER_URL'),
                                            username=os.getenv('KC_ADMIN'),
                                            password=os.getenv('KC_ADMIN_PASSWORD'),
                                            realm_name=os.getenv('KC_REALM'),
                                            client_id=os.getenv('KC_CLIENT_ID'),
                                            client_secret_key=os.getenv('KC_SECRET')))

keycloak_openid = KeycloakOpenID(server_url=os.getenv('KC_SERVER_URL'),
                                 client_id=os.getenv('KC_CLIENT_ID'),
                                 realm_name=os.getenv('KC_REALM'),
                                 client_secret_key=os.getenv('KC_SECRET'))

auth_url = keycloak_openid.auth_url(redirect_uri=os.getenv('KC_OPENID_REDIRECT_URI'),
                                    scope=os.getenv('KC_OPENID_SCOPE'),
                                    state=os.getenv('KC_OPENID_STATE'))

router = APIRouter()

@router.post('/openid-connect/login')
def openid_connect_login(login_dto: OpenidConnectLoginInputModel):
  try:
    credentials = keycloak_openid.token(grant_type='password',
                                        username=login_dto.login,
                                        password=login_dto.password,
                                        code=auth_url,
                                        redirect_uri=os.getenv('KC_REDIRECT_URI'))
    
    return credentials
  except HTTPException as e:
    raise e

@router.post('/openid-connect/register')
def openid_connect_register(register_dto: OpenidConnectRegisterInputModel):
  try:
    user = keycloak_admin.create_user({"username": register_dto.username,
                                      "email": register_dto.email,
                                      "id": register_dto.id,
                                      "enabled": True,
                                      "credentials": [{
                                        "value": register_dto.password,
                                        "type": "password"
                                      }]})
    
    return user
  except HTTPException as e:
    raise e
