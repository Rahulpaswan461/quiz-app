require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const { connectMongoDB } = require("./connection");
const userRoute = require("./routes/user");
const quizRoute = require("./routes/quiz");
const cookieParser = require("cookie-parser");
const { checkForAuthenticateUser } = require("./middlewares/authentication");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 8000; // Set the port to the environment variable or default to 8000

// Connect to MongoDB database using URL from .env file
connectMongoDB(process.env.MONGO_URL)
    .then(() => console.log("MongoDB is connected successfully !!"))
    .catch((error) => console.log("There is some error while connecting !!"));

// Basic home route to check if server is running
app.get("/", (req, res) => {
    return res.send("From the server");
});

// Middleware to parse incoming JSON payloads
app.use(bodyParser.json());

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to check for authentication on protected routes
app.use(checkForAuthenticateUser("token"));

// Routes for user registration and login
app.use("/api/user", userRoute);

// Routes for quiz-related operations
app.use("/api/quiz", quizRoute);

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
