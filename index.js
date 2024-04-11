const express = require("express");
const app = express();

//fetching .env file and defining the port
require("dotenv").config();
const PORT = process.env.PORT || 4000;


//middleware to handel media files
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload());


//Db se connection
const db = require("./config/database");
db.connect();


//cloud se connection
const cloudinary = require("./config/cloudniary");
cloudinary.cloudinaryConnect();


//api route mount krna hai 
const Upload = require("./routes/routes");
app.use("api/v1/upload", Upload);

app.listen(PORT, ()=>[
    console.log(`App is running at port ${PORT}`)
]);
