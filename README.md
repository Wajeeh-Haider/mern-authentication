# MERN Advance Athentication

In this project you will 
learn that how to make complete 
authentication system with email 
verification and JWT Access and Refresh Token. Add redux to make our site more secure and also persist our state on refresh. You will know how to integrate pusher in our app to make mongoDb realtime.



## Run Locally

Clone the project

```bash
  git clone https://github.com/Wajeeh-Haider/mern-authentication
```

Setup Client's Directory

```bash
  cd client
  npm install
  npm run dev
```

Setup Server's Directory

```bash
  cd server
  npm install
  nodemon app.js
  Then create .env file into servers folder and add your secret keys into following env variables
```


## Environment Variables

To run this project, you will need to add the following environment variables to your server's .env file.
For gmail smtp server you can watch this video https://www.youtube.com/watch?v=1YXVdyVuFGA

`PORT` = Any
`DB_USER` = "AnyUser"
`DB_PASSWORD` = "Your DB Passowrd"
`DB_NAME` = "Your MongoDb Name"
`JWT_SECRET` = "Any Value"
`SMTP_USER` 
`SMTP_PASSWORD`
`PUSHER_APP_ID`
`PUSHER_KEY`
`PUSHER_SECRET`
`PUSHER_CLUSTER`

You can add above DB ENV variables as "mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}?retryWrites=true&w=majority"

Client Side ENV variables
`PUSHER_SECRET`


## Features

- Secure Information
- Email Verification
- JWT Access Token
- JWT Refresh Token
- Password Encryption
- HTTP Only Cookie
- Redux State Persistence
- Realtime Profile Update With Pusher


## Demo

https://mern-auth-wajeeh.netlify.app


## Deployment

To deploy your backend on heroku run 

```bash
  cd server
  heroku login
  heroku create <your app name>
  git init 
  git add . 
  git commit -m "typeAnything"
  git push heroku master
```

Now push your react code on git and link with netlify
```bash
   cd client
   git init
   git add .
   git commit -m "your awesome project"
   git remote add origin your-awesome-repo-url
   git push -u origin main/master 
```
**Note:** After doing both steps you just have to copy the link that you had on heroku and paste in the front-end where you call the API



## Acknowledgements

 - [Awesome Readme Templates](https://github.com/Wajeeh-Haider/Wajeeh-Haider)
 - [Awesome README](https://github.com/Wajeeh-Haider/Wajeeh-Haider)
 - [How to write a Good readme](https://github.com/Wajeeh-Haider/Wajeeh-Haider)
