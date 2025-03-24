const mongoose= require("mongoose")

const userSchema =new mongoose.Schema({
    name:{
        type: String,
        required:true
    },

    last_name:{
        type: String,
        required:true
    },

    gender:{
        type: String,
        required:true,
        enum:["Male","Female","Other"]
    },

    age:{
        type: Number,
        required: true
    },

    email:{
        type: String,
        required: true,
        lowercase: true
    },

    password:{
        type:String,
        required: true  
    },
    epilepsy_type:{
        type: String,
        required:true,
        enum:["Focal","generalized","unknown"]
    },
    medication:[{

        medication_name:{
            type: String,
            required:true,
            enum:["panadol","aspirine"]
        },

        medication_frequency:{
            type: Number,
            required:true,
            InputDate: {
                type: Date,
                default: () => Date.now()
            }
        }
    }]
})

module.exports=mongoose.model("user",userSchema)