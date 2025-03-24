const mongoose=require('mongoose')
const User= require("./user")
const Logs=require("./logs")
mongoose.connect("mongodb://localhost/testdb")

run()
async function run(){
    try{
        const user= await User.create({
            name:"Elie",
            last_name:"Saade",
            email:"123sa@S.com",
            gender:"Male",
            age:12,
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