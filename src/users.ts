import { default as axios } from 'axios';
import { SubscriberData, Subscriptions } from "./interfaces/Subscriptions";
import { getAccessToken } from "./utils";

export const getSubscriptions = async (broadcaster_id:string):Promise<SubscriberData[]> => {
    let subscribers: SubscriberData[] = [];
    let cursor = '';
    let response: Subscriptions;
    try{
        do{
            const subscriptionsUrl = `https://api.twitch.tv/helix/subscriptions?broadcaster_id=${broadcaster_id}&after=${cursor}`;
            const requestOptions = {
                method: 'GET',
                url: subscriptionsUrl,
                headers: {
                'Authorization': `Bearer ${getAccessToken()}`,
                'Client-Id': `${process.env.CLIENT_ID}`
                }
            };
            
            response = await axios.request(requestOptions);
            cursor = response.data.pagination.cursor;
            subscribers = [...subscribers, ...response.data.data];
            
        }while(subscribers.length < response.data.total);
    }catch(error){
        console.error(`Error getting subscriptions ${error}`);
    }
    return subscribers;
}

export const getUserInfo = async (userId:string) => {
    const twitchUserApiUrl = `${process.env.TWITCH_API_BASE_URL}${userId}`;
    const requestOptions = {
        method: 'GET',
        url: twitchUserApiUrl,
        headers: {
        'Authorization': `Bearer ${getAccessToken()}`,
        'Client-Id': `${process.env.CLIENT_ID}`
        }
    };
    try{
        const response = await axios.request(requestOptions);
        return response.data.data[0];
    }catch(error){
        console.error(`Error getting user info: ${error}`);
    }
}

export const getUsersAvatars = async (usersArray: SubscriberData[]) => {
    const usersTwitchData = await Promise.all(
        usersArray.map(async (user:SubscriberData) => {
            const {user_id} = user;
            return await getUserInfo(user_id);
        })
    );
    return usersTwitchData.map(user => user.profile_image_url);
}