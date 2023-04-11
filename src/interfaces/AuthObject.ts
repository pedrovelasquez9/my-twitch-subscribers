export interface AuthObject {
    access_token: string,
    expires_in: number,
    refresh_token: string,
    scope: string[],
    token_type: string
}

export interface AuthResponse {
    data: AuthObject
}
