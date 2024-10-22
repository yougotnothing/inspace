import os
from dotenv import load_dotenv
from keycloak import KeycloakOpenIDConnection, KeycloakAdmin

load_dotenv()

keycloak_admin = KeycloakAdmin(connection=KeycloakOpenIDConnection(
                                            server_url='http://localhost:8080/',
                                            username='aW5zcGFjZQ==',
                                            password='aW5zcGFjZS1taW5pby11c2Vycy1hdmF0YXJzLWNvbnRhaW5lcg==',
                                            realm_name='inspace-realm',
                                            user_realm_name='inspace-realm',
                                            client_id='inspace-client',
                                            client_secret_key='YS1st2UchG8yyTYbDKD6yG2XnwJsnFk1'))