import os
from keycloak import KeycloakAdmin, KeycloakOpenIDConnection

keycloak_admin = KeycloakAdmin(connection=KeycloakOpenIDConnection(
                                            server_url=os.getenv('KC_SERVER_URL'),
                                            username=os.getenv('KC_ADMIN'),
                                            password=os.getenv('KC_ADMIN_PASSWORD'),
                                            realm_name=os.getenv('KC_REALM'),
                                            client_id=os.getenv('KC_CLIENT_ID'),
                                            client_secret_key=os.getenv('KC_SECRET')))