const mongoose= require("mongoose")

const daily_logs =new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId, ref:"user",
        required:true
    },

    log_date:{
        type: Date,
        required:true,
        unique: true,
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
//medical adherence part
///////////////////////////////////

med_taken_on_time:{
    type: Boolean,
    required: true,
},

prm_med:{
    quantity:Number,
},

missed_med: [{
    medication_name: {
        type: String,
        required: true
    },
    quantity_missed: {
        type: Number,
        required: true
    }
}],




////////////////////////////////////



    stress:{
        type:Number,
        required:true,
        min:0,
        max:10
    }, 
    
    mood:{
        type:Number,
        required:true,
        min:0,
        max:10
    },

    significant_event:{
        severity: {
            type: Number,
            min:0,
            max:10
        }
    },

    alcohol:[{
        alcoholType: { 
            type: String, 
            enum: ["Vodka", "Beer", "Whiskey", "Gin", "Wine","Arak","Other"],
        },
        quantity:Number,
    }],

    smoking:[{
        smokingType: { 
            type: String, 
            enum: ["Icos", "Vape", "Cigar", "Cigarette", "Other"], 
        },
        quantity:Number,
    }],

    narguileh:{ 
        quantity:Number,
    },

    Caffeine:{
        CaffeineType: [{ 
            type: String, 
            enum: ["Coffee", "Tea"], 
            quantity:Number,
        }]
    },

    energy_drinks:{
        quantity: { 
            type: Number,  
        }
    },

    recreational_drug_use :[{
            type:String,
            quantity:Number
        }],

        ///////////////Food///////////

    meal_frequency:{
            type:Number,
            min:0,
            required:true
        },

    water:{
            type:Number,
            min:0,
            required:true
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
// Validation function to check if missed_med contains only valid medications
daily_logs.path('missed_med').validate(async function(value) {
    const user = await mongoose.model('user').findById(this.userId);
    const validMedications = user.medication.map(med => med.medication_name);
    const invalidMedications = value.filter(med => !validMedications.includes(med.medication_name));
    return invalidMedications.length === 0;
}, 'Invalid medication in missed_med');
module.exports = mongoose.model("logs", daily_logs);