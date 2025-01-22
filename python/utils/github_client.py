import os
from http.client import HTTPException
import requests as request
from starlette.responses import RedirectResponse


class GithubClient:
    GITHUB_AUTHORIZE_URL = str(os.getenv('GITHUB_AUTHORIZE_URL'))
    GITHUB_ACCESS_TOKEN_URL = str(os.getenv('GITHUB_ACCESS_TOKEN_URL'))
    GITHUB_REDIRECT_URI = str(os.getenv('GITHUB_REDIRECT_URI'))
    GITHUB_CLIENT_SECRET = str(os.getenv('GITHUB_CLIENT_SECRET'))
    GITHUB_CLIENT_ID = str(os.getenv('GITHUB_CLIENT_ID'))
    GITHUB_USER_URL = str(os.getenv('GITHUB_USER_URL'))


    def get_authorization_code(self):
        return RedirectResponse(
            request.get(url=self.GITHUB_AUTHORIZE_URL,
                        params={
                            'scope': 'user',
                            'client_id': self.GITHUB_CLIENT_ID,
                            'redirect_uri': self.GITHUB_REDIRECT_URI,
                        }).url)


    def verify_authorization_token(self, code: str):
        try:
            return request.post(url=self.GITHUB_ACCESS_TOKEN_URL,
                                headers={'Accept': 'application/json'},
                                params={
                                    'client_id': self.GITHUB_CLIENT_ID,
                                    'client_secret': self.GITHUB_CLIENT_SECRET,
                                    'redirect_uri': self.GITHUB_REDIRECT_URI,
                                    'code': code,
                                }
            ).json()
        except HTTPException as e:
            raise e


    def get_user_data(self, access_token: str):
        try:
            return request.get(url=self.GITHUB_USER_URL,
                                headers={
                                    'Authorization': f'Bearer {access_token}',
                                    'Accept': 'application/json'
                                }).json()
        except HTTPException as e:
            raise e
