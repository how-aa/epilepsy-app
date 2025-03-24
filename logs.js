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
        eventToday: { type: Boolean, required: true }, 
        severity: [{ 
            type: Number, 
            
            validate: {
                validator: function (value) {
                    return this.eventToday || !value;
                },
                message: "Severity event should only be logged if eventToday is true."
            }
        }]
    },

    alcohol:{
        alcoholToday: { type: Boolean, required: true }, 
        alcoholType: [{ 
            type: String, 
            enum: ["Vodka", "Beer", "Whiskey", "Gin", "Wine","Other"],
            quantity:Number,
            validate: {
                validator: function (value) {
                    return this.alcoholToday || !value;
                },
                message: "Alcohol type should only be selected if alcoholToday is true."
            }
        }]
    },

    smoking:{
        smokingToday: { type: Boolean, required: true }, 
        smokingType: [{ 
            type: String, 
            enum: ["Icos", "Vape", "Cigar", "Cigarette", "Other"], 
            quantity:Number,
            validate: {
                validator: function (value) {
                    return this.smokingToday || !value;
                },
                message: "Smoking type should only be selected if smokingToday is true."
            }
        }]
    },

    narguileh:{
        narguileToday: { type: Boolean, required: true }, 
        quantity:{ 
            type: Number, 
                validate: {
                validator: function (value) {
                    return this.narguileToday || !value;
                },
                message: "Narguile quantity should only be selected if narguileToday is true."
            }
        }
    },

    Caffeine:{
        CaffeineToday: { type: Boolean, required: true }, 
        CaffeineType: [{ 
            type: String, 
            enum: ["Coffee", "Tea", "Other"], 
            quantity:Number,
            validate: {
                validator: function (value) {
                    return this.CaffeineToday || !value;
                },
                message: "Caffeine details should only be selected if CaffeineToday is true."
            }
        }]
    },

    energy_drinks:{
        energy_drinks_Today: { type: Boolean, required: true }, 
        quantity: { 
            type: Number,  
            validate: {
                validator: function (value) {
                    return this.energy_drinks_Today || !value;
                },
                message: "Energy drinks quantity should only be selected if energy_drinks_Today is true."
            }
        }
    },

    recreational_drug_use :{
        recreational_drug_use_Today: { type: Boolean, required: true }, 
        Details:{
            type:String,
            quantity:Number,
            validate: {
                validator: function (value) {
                    return this.recreational_drug_use_Today || !value;
                },
                message: "Recreational drug use drinks details should only be selected if recreational_drug_use_Today is true."
            }
        }
        },

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

    




    exercise:{
        exerciseToday: { type: Boolean, required: true }, // Yes/No
        exercisedetails: [{ 
            exercisetype:{
                type: String, 
                enum: ["Walking", "Running", "Gym", "Swimming", "Other"]
                }, 
            intensity:{
                type:String,
                enum:["Low","Moderate","High"]
                },

            duration:Number,
            
            validate: {
                validator: function (value) {
                    // If exerciseToday is false, exerciseType must be empty
                    return this.exerciseToday || !value;
                },
                message: "Exercise Details should only be selected if exerciseToday is true."
            }
        }]
    }


})

module.exports = mongoose.model("logs", daily_logs);