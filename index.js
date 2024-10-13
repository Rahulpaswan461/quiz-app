require("dotenv").config()

const express = require("express")
const {connectMongoDB} = require("./connection")
const userRoute = require("./routes/user")
const bodyParsser = require("body-parser")
const bodyParser = require("body-parser")
const quizRoute = require("./routes/quiz")
const cookieParser = require("cookie-parser")
const {checkForAuthenticateUser} = require("./middlewares/authentication")

const app = express()
const PORT = process.env.PORT || 8000

connectMongoDB(process.env.MONGO_URL)
.then(()=> console.log("MongoDB is conncted successfully !!"))
.catch((error) => console.log("There is some error while connecting !!"))

app.get("/",(req,res)=>{
     return res.send("From the server")
})

app.use(bodyParser.json())
app.use(cookieParser())
app.use(checkForAuthenticateUser("token"))

app.use("/api/user",userRoute)
app.use("/api/quiz",quizRoute)

app.listen(PORT,()=>{
    console.log("Server is runing at port 8000")
})