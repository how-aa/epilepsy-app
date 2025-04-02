const mongoose=require('mongoose')
const User= require("./user")
const Logs=require("./logs")
mongoose.connect("mongodb://localhost/testdb")

run()
async function run(){
    try{
        const user= await User.create({
            first_name:"Elie",
            last_name:"Saade",
            email:"123sa@S.com",
            gender:"Male",
            date_of_birth:"10/10/2003",
            password:"sad",
            epilepsy_type:"Focal",
            medication:[{
            medication_name:"panadol",
            medication_frequency:1.2
            },
            {
            medication_name:"aspirine",
            medication_frequency:1
            }
        ]

        })
        await user.save()
        console.log(user)
    }
    catch(e){
        console.log(e)

    }
}