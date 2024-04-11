const File = require("../model/file");

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