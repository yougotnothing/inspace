from typing_extensions import Any
from pydantic import BaseModel


class GithubUser(BaseModel):
    login: str
    id: int
    node_id: str
    avatar_url: str
    gravatar_id: str
    url: str
    html_url: str
    followers_url: str
    following_url: str
    gists_url: str
    starred_url: str
    subscriptions_url: str
    organizations_url: str
    repos_url: str
    events_url: str
    received_events_url: str
    type: str
    user_view_type: str
    site_admin: bool
    name: str
    company: Any | None
    blog: str
    location: str
    email: str
    hireable: Any | None
    bio: str
    twitter_username: Any | None
    notification_email: str
    public_repos: int
    public_gists: int
    followers: int
    following: int
    created_at: str
    updated_at: str
    private_gists: int
    total_private_repos: int
    owned_private_repos: int
    disk_usage: int
    collaborators: int
    two_factor_authentication: bool
    plan: dict[str, str | int]


class GithubToken(BaseModel):
    access_token: str
    token_type: str
    scope: str | list[str]
