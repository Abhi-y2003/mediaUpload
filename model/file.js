const mongoose = require("mongoose")
const nodemailer = require("nodemailer");


const fileSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,

    }
});


//post middleware on schema
fileSchema.post("save", async function(doc) {
    try {
        console.log("DOC", doc);


        //creating a transporter

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

        //send mail
        let info = await transporter.sendMail({
            from:"Abhishek singh",
            to:doc.email,
            subject: "New file uploaded on Cloudinary",
            html:`<h2>Hello</h2>  <p>File Uploaded</p>`

        })

        console.log("Info:", info);

    } catch (error) {
        console.error(error);
        return resizeBy.status(401).json({
            success:false,
            message:"Post schema error"
        })
        
    }
})


const File = mongoose.model("File", fileSchema) ;
module.exports = File;