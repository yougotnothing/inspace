from pydantic import BaseModel


class GoogleUserModel(BaseModel):
    iss: str | None
    azp: str | None
    aud: str | None
    sub: str | None
    email: str
    email_verified: bool
    at_hash: str | None
    name: str
    picture: str
    given_name: str | None
    family_name: str | None
    iat: int | None
    exp: int | None


class GoogleOAuthResponse(BaseModel):
    success: bool
    user_info: GoogleUserModel
