const mongoose= require("mongoose")

const seizureSchema =new mongoose.Schema({
    seizure_occurence:{
        type:boolean,
        required:true
    },
    seizure_details: { 
        seizure_type:{
            type:String,
            enum: ["Focal", "Generalized", "Myoclonic", "Other"],
        }, 
        seizure_duration:Number,
        aura_symptoms:boolean,
        postical_symptoms:{
            type:String,
            enum:["Fatigue", "Confusion", "Headache", "Other"]
        },
        validate: {
            validator: function (value) {
                return this.seizure_occurence || !value;
            },
            message: "Seizure details should only be selected if Seizure occured."
        }
    }
})

module.exports=mongoose.model("seizure",seizureSchema)