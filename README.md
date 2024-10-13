# Quiz Application (Node.js & Express.js)

This project is a RESTful API for an online quiz application, developed using Node.js and Express.js. It features user authentication,
quiz management, and functionality for users to take quizzes and view their results.

## Features
- User Registration and Login: Allows users to register and securely log in to the quiz platform.
- Quiz Creation and Management: Admins can create and manage Multiple Choice Questions (MCQ) quizzes with four options and one correct answer.
- Get All Quizzes: Users can view a list of available quizzes.
- Quiz Details: Users can access detailed information for a specific quiz, including the quiz name, description, and questions.
- Take a Quiz: Users can attempt quizzes by submitting answers to the multiple-choice questions.
- View Results: Users can see their results after completing a quiz, including the score and correct answers.
- Database: MongoDB is used as the database to store users, quizzes, and results.
- Authentication and Authorization: JSON Web Tokens (JWT) are used to securely authenticate and authorize users.

## Table of Contents
- Features
- Getting Started
- Installation
- Environment Variables
- API Endpoints
- Technologies Used
- License

## Getting Started
 To get the backend service running on your local machine, follow these instructions.

 ### Prerequisites
 - Node.js (v12 or later)
 - MongoDB
 - Git

## Installation
1. Clone the repository:
  git clone https://github.com/Rahulpaswan461/quiz-app
2. Navigate to the project directory:
   cd quiz-app
3. Install the dependencies:
    npm install
4. Set up the environment variables:
    - JWT_SECRET = your-secret-key
    - PORT = port-number
    - MONGO_URL = your-mongodb-url
5. Start the server:
   npm start

   - The server should now be running on the specified port (from the .env file). You can access the API at http://localhost: port.
  

## Environment Variables

-  In order to run this project, you will need to add the following environment variables to your .env file:

- JWT_SECRET: The secret key used to sign and verify JWT tokens for authentication.
- PORT: The port number on which the server will run (default: 3000 if not specified).
- MONGO_URL: MongoDB connection URL.

  
 ### Example .env file:
- JWT_SECRET=mySuperSecretKey
- PORT=3000
- MONGO_URL=mongodb://localhost:27017/quiz-app

  ## API Endpoints
   ### Authentication
   1. POST /register: Register a new user.
      
      {
        "name": "your-name",
        "email": "your-email",
        "password": "your-password"
 
      }
  
   3. POST /login:
     - Log in as a user or admin.
     - Request Body:
       
      {
        "email": "your-email",
        "password": "your-password"
 
      }
  
  ### Quiz Management
   - POST /api/quiz/create-quiz :
   - POST /api/quiz/:quizId/submit
   - GET /api/quiz/:quizId
   - GET /api/quiz/get-quizes


 ## Technologies Used
 - Node.js: JavaScript runtime for building the backend.
 - Express.js: Web framework for Node.js.
 - MongoDB: Database used to store users, quizzes, and results.
 - Mongoose: ODM for MongoDB.
 - JWT: For user authentication.

  ## License
  This project is licensed under the MIT License - see the LICENSE file for details.
  
