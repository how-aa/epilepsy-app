const mongoose= require("mongoose")

const seizureSchema =new mongoose.Schema([{
    userId:{
        type:mongoose.Schema.Types.ObjectId, ref:"user"
    },
    seizure_day:{
        type:Date,
        unique:true
    },

    seizure_type:{
            type:String,
            enum: ["Focal", "Generalized", "Myoclonic", "Absence", "Tonic", "Clonic", "Non-epileptic"],
        }, 

    seizure_duration:Number,

    aura_symptoms:boolean,

    postical_symptoms:[{
        name:{
            type:String,
            enum:["Fatigue", "Confusion", "Headache", "Other"]
        },
    
        other_symptoms: {
            type: String,
            required: function () {
                return this.medication_name === "other";
            },
            validate: {
                validator: function (value) {
                    if (this.name === "other" && (!value || value.trim() === "")) {
                        return false;
                    }
                    return true;
                },
                message: "Please provide the other symptoms when 'other' is selected."
            }
        },
    }],
}])

module.exports=mongoose.model("seizure",seizureSchema)