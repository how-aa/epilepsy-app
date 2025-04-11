const mongoose= require("mongoose")

const alcohol_and_substance_use =new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId, ref:"user",
        required:true
    },

    log_date:{
        type: Date,
        required:true,
        unique: true,
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


})



module.exports=mongoose.model("alcohol_and_substance_use",alcohol_and_substance_use)