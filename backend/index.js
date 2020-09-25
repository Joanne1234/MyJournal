// Imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');

// Functions
const app = express();
app.use(helmet())
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 5000
const CONNECTION_URI = process.env.DB_CONNECTION

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const authRoute = require("./routes/auth");
const journalRoute = require("./routes/journalEntry");
const reflectionRoute = require("./routes/reflectionEntry");
const moodRoute = require("./routes/mood");
const petRoute = require("./routes/pet");
const miscRoute = require("./routes/misc")

// Route middlewares
app.use("/api/user", authRoute);
app.use("/api/journal", journalRoute);
app.use("/api/reflection", reflectionRoute);
app.use("/api/moods", moodRoute);
app.use("/api/pet", petRoute);
app.use("/api/misc", miscRoute);


// Connect to database
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, (err) =>
    console.log(`Connected to DB,\nErrors: ${err}\n-----`)
);


app.use(express.static(path.join(__dirname, 'build')));
app.get(/^((?!\/api\/).)*$/, (req, res) => {
    //res.setHeader("Content-Security-Policy", "connect-src 'self' https://my-secretgarden.herokuapp.com");
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

// Listen to incoming connections
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server running on port", port);
    }
});
