// Imports
const express = require("express");
const mongoose = require("mongoose");

// Functions
const app = express();

// Import routes
const authRoute = require("./routes/auth");
const journalRoute = require("./routes/journalEntry");
const reflectionRoute = require("./routes/reflectionEntry");


// Connect to database
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, (err) =>
    console.log(`Connected to DB,\nErrors: ${err}\n-----`)
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route middlewares
app.use("/api/user", authRoute);
app.use("/api/journalEntries", journalRoute);
app.use("/api/reflectionEntries", reflectionRoute);

// Listen to incoming connections
app.listen(5000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server running");
    }
});
