import { default as axios } from 'axios';
import { refreshTwitchToken } from "./auth";
import { BroadcasterDataArray } from "./interfaces/Broadcaster";
import { getAccessToken } from "./utils";

export const getBroadcasterId = async(retries:number = 3): Promise<BroadcasterDataArray> => {
    const broadcasterUrl = `https://api.twitch.tv/helix/users?login=${process.env.TWITCH_CHANNEL}`;
        const requestOptionsBroadcasterId = {
            method: 'GET',
            url: broadcasterUrl,
            headers: {
            'Authorization': `Bearer ${getAccessToken()}`,
            'Client-Id': process.env.CLIENT_ID
            }
        };
        try{
            return await axios.request(requestOptionsBroadcasterId);
        }catch(error){
            if(retries > 0){
                await refreshTwitchToken();
                return getBroadcasterId(retries-1);
            }else{
                throw new Error(`Error obtaining broadcaster id ${error}`);
            }
        }
}