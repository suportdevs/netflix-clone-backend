const mongoose = require('mongoose');

const dbConnection =() =>{
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("Database connection sucessfull.");
    }).catch(err => {
        console.log(err)
    })
}

module.exports = dbConnection