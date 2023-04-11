let accessToken:string;
let refreshToken:string;

export const getRefreshToken = () => {
    return refreshToken;
}

export const getAccessToken = () => {
    return accessToken;
}

export const setRefreshToken = (token: string) => {
    refreshToken = token;
}

export const setAccessToken = (token:string) => {
    accessToken = token;
}