from google_auth_oauthlib.flow import Flow

scopes = ['https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/userinfo.email',
          'openid']
flow = Flow.from_client_secrets_file('google-oauth-credentials.json',
                                     scopes=scopes,
                                     redirect_uri="http://localhost:5174/oauth2/google")
