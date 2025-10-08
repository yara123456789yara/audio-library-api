const mongoose = require('mongoose');

 function dbConnections() {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Database connection successfully");
    }).catch((err) => {
        console.log("Database connection Failed");
    })
}

module.exports = {
 dbConnections
};