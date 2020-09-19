# MySecretGarden

A web app that gamifies the process of journal writing and reflections

## Background


## System Architecture
Frontend: [React JS] (https://reactjs.org)
Backend: [Node JS] (https://nodejs.org/en/), [Mongodb Atlas] (https://www.mongodb.com/cloud/atlas)

### Documentation

API documentation for the backend can be found [here] (https://app.swaggerhub.com/apis-docs/MySecretGarden/MySecretGarden/1.0.0).


## Installing and running locally
### Prerequisites
Node js
Clone the repository: `git clone ___`
`cd MySecretGarden`

### Install the dependencies for both the frontend and backend
```cd frontend
npm install
cd ../backend
npm install
```

### Setting the environment variables
Create a .env file in the backend folder. 
```
touch .env
```
In the .env file: 
```
DB_CONNECTION={YourMongdbAtlasConnection} 
ACCESS_TOKEN_SECRET={SomethingSuperSecret} 
ACCESS_REFRESH_TOKEN={SomethingSuperSecret}
```
You are recommended to use Node's crypto library to generate the access tokens:
```> require('crypto').randomBytes(64).toString('hex')```

### run the web app
Make sure you are in the backend folder and run `npm start dev`
