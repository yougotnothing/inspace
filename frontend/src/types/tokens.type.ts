export interface Tokens {
  [key: string]: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    refresh_expires_in: number;
    session_state: string;
  };
}
