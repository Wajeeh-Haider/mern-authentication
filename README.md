# MERN Advance Athentication

In this project you will 
learn that how to make complete 
authentication system with email 
verification and JWT Auth Token. Add redux to make our site more secure and also persist our state on refresh.



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
  Then create .env file into server's folder and add your secret keys into following env variables
```


## Environment Variables

To run this project, you will need to add the following environment variables to your server's .env file.
For gmail smtp server you can watch this video https://www.youtube.com/watch?v=1YXVdyVuFGA

`PORT` 
`DB_USER`
`DB_PASSWORD`
`DB_NAME`
`JWT_SECRET`
`SMTP_USER`
`SMTP_PASSWORD`


## Features

- Email Verification
- JWT Access Token
- Password Encrypition
- JWT Refresh Token
- State Persistence


## Demo

https://mern-auth-wajeeh.netlify.app/


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
   git remote add origin <your repo url>
   git push -u origin main/master 
```
**Note:** After doing both steps you just have to copy the link that you had on heroku and paste in the front-end where you call the API



## Acknowledgements

 - [Awesome Readme Templates](https://github.com/Wajeeh-Haider/Wajeeh-Haider)
 - [Awesome README](https://github.com/Wajeeh-Haider/Wajeeh-Haider)
 - [How to write a Good readme](https://github.com/Wajeeh-Haider/Wajeeh-Haider)
