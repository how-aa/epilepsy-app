

/////////   DATA IS DIFFRENT NOW; THE FOLLOWING SCRIPT WILL NOT WORK/////////////

// const mongoose = require("mongoose");
// const User = require("./user");
// const Logs = require("./logs");
// const Seizure = require("./seizure");

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/epilepsy-app', { useNewUrlParser: true, useUnifiedTopology: true });

// // Function to create a new user
// async function createUser(userData) {
//     try {
//         const newUser = new User(userData);
//         await newUser.save();
//         console.log("User created successfully:", newUser);
//         return newUser;
//     } catch (error) {
//         console.error("Error creating user:", error);
//     }
// }

// // Function to create a daily log entry
// async function createDailyLog(userId, logData) {
//     try {
//         logData.userId = userId;
//         const newLog = new Logs(logData);
//         await newLog.save();
//         console.log("Daily log created successfully:", newLog);
//         return newLog;
//     } catch (error) {
//         console.error("Error creating daily log:", error);
//     }
// }

// // Function to create a seizure log entry
// async function createSeizureLog(userId, seizureData) {
//     try {
//         seizureData.userId = userId;
//         const newSeizureLog = new Seizure(seizureData);
//         await newSeizureLog.save();
//         console.log("Seizure log created successfully:", newSeizureLog);
//         return newSeizureLog;
//     } catch (error) {
//         console.error("Error creating seizure log:", error);
//     }
// }

// // Example usage
// async function main() {
//     // Create a new user
//     const user = await createUser({
//         first_name: "Sandrine",
//         last_name: "Sila",
//         gender: "Female",
//         menustralCycleStatus: "Regular",
//         date_of_birth: 21,
//         email: "sandrine.sila@net.usj.edu.lb",
//         password: "password123",
//         epilepsy_type: "Generalized",
//         medication: [
//             { medication_name: "Acetazolamide 250 mg", medication_frequency: 2 },
//             { medication_name: "Clobazam 10 mg", medication_frequency: 1 }
//         ]
//     });

//     if (user) {
//         // Create a daily log entry for the new user
//         await createDailyLog(user._id, {
//             log_date: new Date(),
//             sleep: {
//                 sleep_time: new Date(),
//                 wake_time: new Date(),
//                 sleep_quality: 8
//             },
//             nap: [{
//                 nap_sleep_time: new Date(),
//                 nap_wake_time: new Date(),
//                 nap_quality: 7
//             }],
//             fatigue: 5,
//             med_taken_on_time: true,
//             stress: 3,
//             mood: 6,
//             significant_event:{
//                 severity:4
//             },
//             alcohol:[
//                 {
//                 alcoholType: "Beer",
//                 quantity: 2,
//                 },
//                 {
//                 alcoholType: "Vodka",
//                 quantity: 3,
//                 }
//             ],

//             smoking: [{
//                 smokingType: "Cigarette",
//                 quantity: 5
//             }],
//             Caffeine: [{
//                 caffeineType: "Coffee",
//                 quantity: 2
//             }],
//             meal_frequency: 3,
//             water:2,
//             exercise: [{
//                 exercisetype: "Running",
//                 intensity:"Low",
//                 duration: 30
//             }],
//         });

//         // Create a seizure log entry for the new user
//         await createSeizureLog(user._id, {
//             seizure_day: new Date(),
//             seizure_duration: 5,
//             aura_symptoms: true,
//             seizure_type: "Generalized",
//             postical_symptoms: [{name_symp:"Other",other_symptoms:"Fati"}],            
//         });
//     }
// }

// main();