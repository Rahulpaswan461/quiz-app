const mongoose = require("mongoose")

const quizSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    questions:[{
        question:{
            type: String,
            required: true,
        },
        options:[{
          type:String
        }],
        correctOption:{
            type: String,
            required: true
        }
    }]
},{timestamps: true})

const Quiz = mongoose.model("quiz",quizSchema)

module.exports = Quiz