import { default as axios } from 'axios';
import { AuthResponse } from "./interfaces/AuthObject";
import { getRefreshToken, setAccessToken, setRefreshToken } from "./utils";

export const refreshTwitchToken = async () => {
    const twitchApiUrl = process.env.TWITCH_TOKEN_URL;
    const formBody = `client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${getRefreshToken()}`;
    const requestOptionsRefreshToken = {
        method: 'POST',
        url: twitchApiUrl,
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        data: formBody
    }
    try{
        const response: AuthResponse = await axios.request(requestOptionsRefreshToken);
        setAccessToken(response.data.access_token);
        setRefreshToken(response.data.refresh_token);
    }catch(error: any){
        console.error(error.response.data);
        await getTwitchToken();
    }
}

export const getTwitchToken = async () => {
    const formBody = `client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${process.env.TWITCH_AUTH_CODE}&grant_type=authorization_code&redirect_uri=${process.env.REDIRECT_URI}`;
    const requestOptions = {
        method: 'POST',
        url: process.env.TWITCH_TOKEN_URL,
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        data: formBody
    };
    try{
        const response:AuthResponse = await axios.request(requestOptions);
        if(response.data){
            const {access_token, refresh_token} = response.data;
            setAccessToken(access_token);
            setRefreshToken(refresh_token);
        }
    }catch(error:any){
        if(error.response.data.status === 400 ){
            console.error(`INVALID AUTH CODE: In order to get a new one, go to this link: https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=http://localhost:3000&scope=channel%3Aread%3Asubscriptions to obtain the code and replace the env variable TWITCH_AUTH_CODE in your .env file. The code will appear after redirection in the browsers URL as 'code' param.`);
            throw new Error(error);
        }else{
            console.error(`Error obtaining Twitch token: ${JSON.stringify(error.response.data)}`);
        }
    }
};