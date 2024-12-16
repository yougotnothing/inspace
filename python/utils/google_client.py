from google_auth_oauthlib.flow import Flow


flow = Flow.from_client_secrets_file('google-oauth-credentials.json',
                                     scopes=['https://www.googleapis.com/auth/userinfo.profile',
                                             'https://www.googleapis.com/auth/userinfo.email',
                                             'openid'],
                                     redirect_uri="http://localhost:5173/oauth2/google")
