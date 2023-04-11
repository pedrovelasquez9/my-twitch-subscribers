import express from "express";
import dotenv from 'dotenv'
import { getTwitchToken } from "./auth";
import { getAccessToken, getRefreshToken } from "./utils";
import { getBroadcasterId } from "./broadcaster";
import { getSubscriptions, getUsersAvatars } from "./users";

dotenv.config();

const app = express();

const processRequest = async () => {
    try{
        if(!getAccessToken() || !getRefreshToken()){
            await getTwitchToken();
        }
        const broadcaster_id = await getBroadcasterId();
        const {data} = broadcaster_id.data;
        const suscriptorsData = await getSubscriptions(data[0].id);
        const usersAvatars = await getUsersAvatars(suscriptorsData);
        return usersAvatars;
    }catch(err){
        return err;
    }
}
  
app.get('/twitch-token', async (req, res)=>{
    const result = await processRequest();
    res.send(result);
});
  
app.listen(process.env.PORT, () =>{
        console.log("Server is Successfully Running, and App is listening on port "+ process.env.PORT);
        console.info(`In order to start, go to this link: https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=http://localhost:3000&scope=channel%3Aread%3Asubscriptions to obtain the code and replace the env variable TWITCH_AUTH_CODE in your .env file. The code will appear after redirection in the browsers URL as 'code' param.`);
});