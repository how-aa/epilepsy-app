const mongoose= require("mongoose")

const menstual_cycle =new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId, ref:"user",
        required:true
    },

    log_date:{
        type: Date,
        required:true,
        unique: true,
    },

    period:{
        is_on_period:{
            type:Boolean
        },
        start_date:{
            type: Date
        }
    },

    pregnant:{
        type:Boolean
    }


})



module.exports=mongoose.model("menstual_cycle",menstual_cycle)