const mongoose= require("mongoose")

const physical_activity =new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId, ref:"user",
        required:true
    },

    log_date:{
        type: Date,
        required:true,
        unique: true,
    },

    exercise: [{ 
        exercisetype:{
            type: String, 
            enum: ["Walking", "Running", "Gym", "Swimming","Yoga","Boxing", "Other"]
            }, 
        intensity:{
            type:String,
            enum:["Low","Moderate","High"]
            },
        duration:Number,
    }],


})



module.exports=mongoose.model("physical_activity",physical_activity)