import os
from keycloak import KeycloakOpenID

keycloak_openid = KeycloakOpenID(server_url=os.getenv('KC_SERVER_URL'),
                                 client_id=os.getenv('KC_CLIENT_ID'),
                                 realm_name=os.getenv('KC_REALM'),
                                 client_secret_key=os.getenv('KC_SECRET'))