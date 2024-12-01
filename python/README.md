# ☾ Inspace (fastapi service)

[![stack](https://skillicons.dev/icons?i=python,docker,fastapi)](https://skillicons.dev)

### Python fastapi service for keycloak, and google, github OAuth authorization.

<br/>

### Implemented features:

> ### **_`OAuth`_**:
>
> > - [ ] Google
> > - [ ] Github

---

> ### **_`Keycloak Auth`_**:
>
> > - [x] Create User
> > - [x] Delete User
> > - [ ] Update User Data
> > - [x] Login User
> > - [x] Logout User
> > - [x] Refresh Token

> ### **_`Geolocation`_**:
>
> > - [x] Parse Geolocation by coordinates (latitude and longitude)

---

<br/>

## Mappings:

### /geolocation:

- **_`GET`_** `/reverse`
  - Returns place and country name by coordinates (latitude and longitude)
  - Query:
    - latitude: `float`
    - longitude: `float`
  - Returns:
    - `"placeName"`: `str`
    - `"countryName"`: `str`

<br />

### /auth:

- **_`POST`_** `/openid-connect/login`
  - login user in Keycloak
  - body:
    - login_dto: [`OpenidConnectLoginInputModel`](#openidconnectlogininputmodel)
  - Returns:
    - [`OpenidConnectModel`](#openidconnectmodel)

<br />

- **_`POST`_** `/openid-connect/register`
  - register new user in Keycloak
  - body:
    - register_dto: [`OpenidConnectRegisterInputModel`](#openidconnectregisterinputmodel)
  - Returns:
    - `"user_id"`: `str`

<br/>

## Types:

### openidconnectlogininputmodel

```python
  from pydantic import BaseModel

  class OpenidConnectLoginInputModel(BaseModel):
    login: str
    password: str
```

### openidconnectmodel

```python
  from pydantic import BaseModel

  class OpenidConnectModel(BaseModel):
    access_token: str
    refresh_token: str
    expires_in: int
    refresh_expires_in: int
    session_state: str
```

### openidconnectregisterinputmodel

```python
  from pydantic import BaseModel

  class OpenidConnectRegisterInputModel(BaseModel):
    username: str
    password: str
    email: str
    id: str
```
