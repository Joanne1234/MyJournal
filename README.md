# MySecretGarden

My Secret Garden is a web app that gamifies the process of writing journals, reflections as well as mood tracking to create a fun, motivating and meaningful experience that you always want to come back to. 

Collect points by writing a journal to document your experiences and actions throughout your day, rating your mood and write a reflection to analyse your experience...the process of finding out who you really are and understanding yourself better! Why did you do what you did and what has impacted your perspective and actions?

Use the points to level up your pet and most importantly, GROW with your pet!

## System Architecture
Frontend: [React JS](https://reactjs.org)

Backend: [Node JS](https://nodejs.org/en/), [Mongodb Atlas](https://www.mongodb.com/cloud/atlas)

### Documentation
API documentation for the backend can be found [here](https://app.swaggerhub.com/apis-docs/Joanne1/MySecretGarden/1.0.0).


## Installing and running locally
### Prerequisites
- [Node JS](https://nodejs.org/en/) installed locally
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free-tier is fine)

Clone the repository: 
```git clone https://github.com/Joanne1234/MySecretGarden.git```

`cd MySecretGarden`

### Install the dependencies for both the frontend and backend
```
cd frontend
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
DB_CONNECTION={YourMongoDBAtlasConnection} 
ACCESS_TOKEN_SECRET={SomethingSuperSecret} 
ACCESS_REFRESH_TOKEN={SomethingSuperSecret}
```
You are recommended to use Node's crypto library to generate the access tokens:

```> require('crypto').randomBytes(64).toString('hex')```

### Running the web app
Make sure you are in the backend folder and run `npm start dev`
