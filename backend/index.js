// Imports
const express = require("express");
const mongoose = require("mongoose");

// Functions
const app = express();
const port = process.env.PORT || 5000
const CONNECTION_URI = process.env.DB_CONNECTION

// Import routes
const authRoute = require("./routes/auth");
const journalRoute = require("./routes/journalEntry");
const reflectionRoute = require("./routes/reflectionEntry");
const moodRoute = require("./routes/mood");
const petRoute = require("./routes/pet");
const miscRoute = require("./routes/misc")

// Connect to database
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, (err) =>
    console.log(`Connected to DB,\nErrors: ${err}\n-----`)
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route middlewares
app.use("/api/user", authRoute);
app.use("/api/journal", journalRoute);
app.use("/api/reflection", reflectionRoute);
app.use("/api/moods", moodRoute);
app.use("/api/pet", petRoute);
app.use("/api/misc", miscRoute);

// Listen to incoming connections
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server running");
    }
});
