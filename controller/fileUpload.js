const File = require("../model/file");
const cloudinary = require("cloudinary").v2

exports.localFileUpload = async (req,res)=>{
    try {
        
        //fetching the file
        const file = req.files.file;
         
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("Path is", path);


        file.mv(path, (error) => { 
            console.log("error")
        });

        res.status(200).json({
            success:true,
            message:"local file uploaded successfully"
        })
    } catch (error) {

        console.log(error);
        res.status(500).json({
            success:false,
            message:"local file uploaded successfully"
        })

        
    }
}


function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder) {
    const options = {folder};
    options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
} 


//image upload handler

exports.imageUpload = async(req,res) => {

    try {

        //data fetch kar rhe hai from the request
        const{name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        //validation 
        const supportedTypes = ["jpeg", "jpg", "png"]
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported){
            return res.status(400).json({
                success:false,
                message:'File format not supported'
            })
        }


        //if file format is supported
        //cloudinary pe upload karenge

        const response = await uploadFileToCloudinary(file, "new");

        console.log(response);
        //save a entry in db

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url


        });

        res.json(200).json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image uploaded successfully"
        })

        
    } catch (error) {

        console.error(error);
        return res.json(400).json({
            success:false,
            message:"Error in image upload on cloudinary"
        })
        
    }
}

//video upload on cloudinary
exports.videoUpload = async(req,res)=>{

    try {
        
        //fetching the data from the api 
        const{name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.videoFile;
        console.log(file);

        //validation of videofile

        const supportedTypes = ["mp4", "mov"]
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported){
            return res.status(400).json({
                success:false,
                message:'File format not supported'
            })
        }

        //cloudinary pr upload karenge

        const response = await uploadFileToCloudinary(file, "new");
        console.log(response);
        console.log("hello")

        
        //db mein entry save kro 

        const fileData = await File.create({
            name,
            email,
            tags,
            imageUrl:response.secure_url
        });

        return res.status(200).json({
            success:true,
            message:"Video uploaded successfully"
        });



    } catch (error) {
        console.error(error);
        return res.status(401).json({
            success:false,
            message:"Video file not uploaded"
        });
    }
}
