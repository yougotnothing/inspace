import json
import os
from keycloak import KeycloakAdmin, KeycloakOpenID, KeycloakOpenIDConnection


class KeycloakClient:
    def __init__(self):
        try:
            self.admin = KeycloakAdmin(connection=KeycloakOpenIDConnection(
                                        server_url=os.getenv('KC_SERVER_URL'),
                                        username=os.getenv('KC_ADMIN_USERNAME'),
                                        password=os.getenv('KC_ADMIN_PASSWORD'),
                                        realm_name=os.getenv('KC_REALM') or 'master',
                                        client_id=os.getenv('KC_CLIENT_ID') or 'client id',
                                        client_secret_key=os.getenv('KC_CLIENT_SECRET')))

            self.openid = KeycloakOpenID(server_url=os.getenv('KC_SERVER_URL'),
                                         client_id=os.getenv('KC_CLIENT_ID'),
                                         realm_name=os.getenv('KC_REALM'),
                                         client_secret_key=os.getenv('KC_CLIENT_SECRET'),
                                         verify=True)

            self.create_realm_if_not_exists()
        except Exception as e:
            print(f"Error initializing KeycloakAdminClient: {str(e)}")
            raise e


    def create_realm_if_not_exists(self):
        try:
            realm = self.admin.get_realm(realm_name=os.getenv('KC_REALM'))
            if realm:
                print('Realm already exists')
            else:
                with open('realm-export.json', 'r') as realm_file:
                    realm_config = json.load(realm_file)
                self.admin.create_realm(payload=realm_config)

                print('Realm created successfully')
        except Exception as e:
            print(f"Error creating/checking realm: {str(e)}")
            raise
