const mongoose = require("mongoose");

require("dotenv").config();

exports.connect= () =>{
    mongoose.connect(process.env.DATABASE_URL)

.then(console.log("database connection successful"))
.catch( (error) =>{
    console.log("database connection issue");
    console.error(error);
    process.exit(1); 
});
}; 