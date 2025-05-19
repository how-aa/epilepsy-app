const mongoose= require("mongoose")

const sleep_and_fatigue =new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId, ref:"user",
        required:true
    },

    log_date:{
        type: Date,
        required:true,
    },

    sleep:{
        sleep_time:{
            type: Date,
            required:true
        },

        wake_time:{
            type: Date,
            required:true
        },

        sleep_quality:{
            type: Number,
            required:true,
            min:0,
            max:10
        }
    },

    
    nap:[{
        nap_sleep_time:{
            type: Date,
            required:true
        },

        nap_wake_time:{
            type: Date,
            required:true
        },

        nap_quality:{
            type: Number,
            required:true,
            min:0,
            max:10
        }
    }],

    fatigue:{
        type:Number,
        required:true,
        min:0,
        max:10
    },



})

module.exports=mongoose.model("sleep_and_fatigue",sleep_and_fatigue)