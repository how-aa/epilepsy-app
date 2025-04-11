const mongoose= require("mongoose")

const medication_adherence =new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId, ref:"user",
        required:true
    },

    log_date:{
        type: Date,
        required:true,
        unique: true,
    },

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
})

// Validation function to check if missed_med contains only valid medications
daily_logs.path('missed_med').validate(async function(value) {
    const user = await mongoose.model('user').findById(this.userId);
    const validMedications = user.medication.map(med => med.medication_name);
    const invalidMedications = value.filter(med => !validMedications.includes(med.medication_name));
    return invalidMedications.length === 0;
}, 'Invalid medication in missed_med');

module.exports=mongoose.model("medication_adherence",medication_adherence)