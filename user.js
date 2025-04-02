const mongoose= require("mongoose")

const userSchema =new mongoose.Schema({
    first_name:{
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
        enum:["Male","Female","Other","Prefer not to say"],
    },

    menstrualCycleStatus: {
        type: String,
        enum: ["Regular", "Irregular", "Pregnancy", "Menopause"],
        validate: {
            validator: function(value) {
                if (this.gender === "Male" && value) {
                    return false; 
                }
                if (this.gender === "Female" && !value) {
                    return false; 
                }
                return true; 
            },
            message: function(props) {
                return props.value
                    ? "Menstrual Cycle Status can not be entered for male patients."
                    : "Menstrual Cycle Status is required for female patients.";
            }
        }
    },

    date_of_birth:{
        type: Date,
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
        enum:["Focal","Generalized","Non-epileptic"],
    },

    
    medication: [{
        medication_name: {
            type: String,
            required: true,
            enum: [ "Acetazolamide 250 mg",  
                    "Brivaracetam 25 mg",  
                    "Brivaracetam 50 mg",  
                    "Brivaracetam 100 mg",  
                    "Carbamazepine 200 mg",  
                    "Carbamazepine 200 mg CR",  
                    "Carbamazepine 300 mg",  
                    "Carbamazepine 400 mg CR",  
                    "Carbamazepine 600 mg",  
                    "Carbamazepine 200 ml",  
                    "Carbamazepine 200 ml CR",  
                    "Carbamazepine 300 ml",  
                    "Carbamazepine 400 ml CR",  
                    "Carbamazepine 600 ml", 
                    "Cenobamate 12.5 mg",  
                    "Cenobamate 50 mg",  
                    "Cenobamate 100 mg",  
                    "Cenobamate 150 mg",  
                    "Cenobamate 200 mg",  
                    "Clobazam 5 mg",  
                    "Clobazam 10 mg",  
                    "Clonazepam 0.5 mg",  
                    "Clonazepam 2 mg",  
                    "Eslicarbazepine 800 mg",  
                    "Ethosuximide 250 mg",  
                    "Ethosuximide 250 ml",  
                    "Gabapentin 100 mg",  
                    "Gabapentin 300 mg",  
                    "Gabapentin 400 mg",  
                    "Lacosamide 50 mg",  
                    "Lacosamide 100 mg",  
                    "Lacosamide 200 mg",  
                    "Lacosamide 50 ml",  
                    "Lacosamide 100 ml",  
                    "Lacosamide 200 ml",                    
                    "Lamotrigine 25 mg",  
                    "Lamotrigine 50 mg",  
                    "Lamotrigine 100 mg",  
                    "Levetiracetam 250 mg",  
                    "Levetiracetam 500 mg",  
                    "Levetiracetam 1000 mg",  
                    "Lorazepam 1 mg",  
                    "Lorazepam 2 mg",  
                    "Oxcarbazepine 150 mg",  
                    "Oxcarbazepine 300 mg",  
                    "Oxcarbazepine 600 mg",  
                    "Oxcarbazepine 150 ml",  
                    "Oxcarbazepine 300 ml",  
                    "Oxcarbazepine 600 ml",  
                    "Perampanel 2 mg",  
                    "Perampanel 4 mg",  
                    "Perampanel 6 mg",  
                    "Perampanel 8 mg",  
                    "Perampanel 10 mg",  
                    "Perampanel 12 mg",  
                    "Phenobarbital 10 mg",  
                    "Phenobarbital 100 mg",  
                    "Phenytoin 100 mg",  
                    "Pregabalin 25 mg",  
                    "Pregabalin 75 mg",  
                    "Pregabalin 100 mg",  
                    "Pregabalin 150 mg",  
                    "Topiramate 25 mg",  
                    "Topiramate 50 mg",  
                    "Topiramate 100 mg",  
                    "Valproic Acid 200 mg",  
                    "Valproic Acid 500 mg",  
                    "Valproic Acid 500 mg Chrono",  
                    "Valproic Acid 200 ml",  
                    "Valproic Acid 500 ml",  
                    "Valproic Acid 500 ml Chrono", 
                    "Zonisamide 25 mg",  
                    "Zonisamide 50 mg",  
                    "Zonisamide 100 mg",  
                    "Other"],  
        },

        other_medication_name: {
            type: String,
            required: function () {
                return this.medication_name === "other";
            },
            validate: {
                validator: function (value) {
                    if (this.medication_name === "other" && (!value || value.trim() === "")) {
                        return false;
                    }
                    return true;
                },
                message: "Please provide the name of the medication when 'other' is selected."
            }
        },

        medication_frequency: {
            type: Number,
            required: true,
            InputDate: {
                type: Date,
                default: () => Date.now()
            }
        }
    }]

})

module.exports=mongoose.model("user",userSchema)