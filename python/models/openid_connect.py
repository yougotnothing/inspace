from pydantic import BaseModel

class OpenidConnectLoginInputModel(BaseModel):
  login: str
  password: str

class OpenidConnectModel(BaseModel):
  access_token: str
  refresh_token: str
  expires_in: int
  refresh_expires_in: int
  session_state: str

class OpenidConnectRegisterInputModel(BaseModel):
  username: str
  password: str
  email: str
  id: str