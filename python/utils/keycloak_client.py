import os
from dotenv import load_dotenv
from keycloak import KeycloakOpenID

load_dotenv()

keycloak_openid = KeycloakOpenID(server_url='http://keycloak:8080/',
                                 client_id='inspace-client',
                                 realm_name='inspace-realm',
                                 client_secret_key='YS1st2UchG8yyTYbDKD6yG2XnwJsnFk1')

auth_url = keycloak_openid.auth_url(redirect_uri='http://localhost:5173/home',
                                    scope='openid profile email',
                                    state='secret')

keycloak_openid.token(grant_type='password',
                      code=auth_url,
                      redirect_uri='http://localhost:5173/home')