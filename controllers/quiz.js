const { default: mongoose } = require("mongoose");
const Quiz = require("../models/quiz")

async function createQuiz(req,res){
     try{
         const { title, description, questions } = req.body

         if(!title || !description || !questions){
             return res.status(400).json({msg:"Incomplete information !!"})
         }

         let quiz = new Quiz({
            title: title,
            description: description,
            questions: questions
         })

         quiz = await quiz.save();

         if(!quiz){
             return res.status(400).json({msg:"no quiz created !!"})
         }

         return res.status(200).json({msg:"quiz created successfully !!"})
     }
     catch(error){
        console.log("There is some error",error)
        return res.status(500).json({error: error.message})
     }
}

async function getAllquizes(req,res){
     try{
        const quiz = await Quiz.find({});
        if(!quiz){
             return res.status(400).json({msg:"no quiz crated !!"})
        }

        return res.status(200).json(quiz)
     }
     catch(error){
        console.log("There is some error",error)
        return res.status(500).json({error: error.message})
     }
}

async function getQuizDetails(req,res){
     try{
        if(!mongoose.isValidObjectId(req.params.quizId)){
             return res.status(400).json({error: "Invalid quiz id !!"})
        }
        const quiz = await Quiz.findById(req.params.quizId)

        if(!quiz){
             return res.status(400).json({msg: "No quiz is present with the corresponding id : "});
        }

        return res.status(200).json(quiz)
     }
     catch(error){
        console.log("There is some error", error)
        return res.status(500).json({msg:error.message})
     }
}

async function submitQuiz(req, res){
     try{ 
        if(!mongoose.isValidObjectId(req.params.quizId)){
             return res.status(400).json({msg: "Invalid quiz id : "})
        }

         const { answer } = req.body;

         const quiz = await Quiz.findById(req.params.quizId)
         if(!quiz){
             return res.status(400).json({msg: "No quiz is avaible with the given id : "})
         }

         let score = 0;
         const totalQuestion = quiz.questions.length;

         const correctanswer = quiz.questions.map((question,index)=>{
            const iscorrect = question.correctOption === answer[index]

            if(iscorrect === true){
                score+=1
            }

            return {
                question : question.question,
                selectedOption: answer[index],
                correctOption: question.correctOption,
                isCorrect: iscorrect
            }
         })

         return res.status(200).json({
            score,
            totalQuestion,
            correctanswer
         })
     }
     catch(error){
        console.log("There is some error",error)
        return res.status(500).json({error:error.message})
     }
}

module.exports = {
    createQuiz,
    getAllquizes,
    getQuizDetails,
    submitQuiz
}