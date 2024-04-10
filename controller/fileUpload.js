const File = require("../model/file");

exports.localFileUpload = async (req,res)=>{
    try {
        
        //fetching the file
        const file = req.files.file;
         
        let path = __dirname + "/files/" + Date.now();
        console.log("Path is", path);


        file.mv(path, (error) ={

        })
    } catch (error) {
        
    }
}