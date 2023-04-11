# [My Twitch Subscribers](https://programacion-es.dev)

<div style="width:100%;display:flex;flex-direction:column;align-items:center">
    <img src="./docs/assets/img/Logo-circle.webp" with="150px" height="150px" />
    <h1>Programación en español</h1>
</div>

## About

### Powered by NodeJS & TypeScript

<a href="https://nodejs.org"><img src="https://nodejs.org/static/images/logo.svg" alt="Nodejs" width="300"/></a>

This project is a NodeJS service that returns a Twitch channel subscribers avatars for any streamer to use developed live in Programación en español's [Twitch Channel](https://www.twitch.tv/programacion_en_esp).

## How to start?

First of all, you'll need a developer Twitch application in order to get your **app secret** and **app id**, you can create the app in [this link](https://dev.twitch.tv/docs/authentication/register-app)

Once you get the secret and ID, rename the **.env.template** to **.env** and replace the content like this:

- **CLIENT_ID=YOUR_TWITCH_CLIENT_ID**
- **TWITCH_CHANNEL=YOUT_TWITCH_CHANNEL_NAME**
- **CLIENT_SECRET=YOUR_TWITCH_APP_CLIENT_SECRET**

After that, enter this url **replacing the app id param** https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=http://localhost:3000&scope=channel%3Aread%3Asubscriptions

This will ask you for permissions for getting information from your Twitch account, once granted, it will redirect you to localhost:3000 **DO NOT CLOSE THE BROWSER AT THIS POINT**. In the redirected url in the browser, get the **code** parameter and copy it to your **.env** file replacing this variable:

- **TWITCH_AUTH_CODE=YOUR_TWITCH_AUTH_CODE**

**NOTE:** you'll have to refresh this code every time you stop the nodejs application for the app to get a new token at start.

Now you can run the project, clone this repository and install dependencies before running the service:

- **npm i**
- **npm start**

## Want to collaborate with the project?

If you wish to collaborate, you can **fork** the project in order to work in your environment. Once you're ready to go, you can launch a PR to **develop branch** of this repository

## Join the community

<div style="width:100%;display:flex;flex-direction:row;justify-content:center">
    <a href="https://discord.gg/programacion-es"><img src="./docs/assets/img/discord-icon.webp" with="50px" height="50px" /></a>
    <a href="https://www.youtube.com/@programacion-es"><img src="./docs/assets/img/youtube-icon.webp" with="50px" height="50px" /></a>
    <a href="https://www.twitch.tv/programacion_en_esp"><img src="./docs/assets/img/twitch-logo-borderless.webp" with="50px" height="50px" /></a>
    <a href="https://instagram.com/programacion.es/"><img src="./docs/assets/img/instagram-icon.webp" with="50px" height="50px" /></a>
    <a href="https://twitter.com/program_es"><img src="./docs/assets/img/twitter-icon.webp" with="50px" height="50px" /></a>
    <a href="https://www.tiktok.com/@programacion.es"><img src="./docs/assets/img/tiktok-icon.webp" with="50px" height="50px" /></a>
    <a href="https://www.linkedin.com/in/pedroplasencia/"><img src="./docs/assets/img/linkedin-icon.webp" with="50px" height="50px" /></a>
</div>
