import mongoose from "mongoose";


const resumeSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
        index : true
    },
   fileName: String,
   fileUrl : String,
   publicId : String,
   fileType : {
    
    type : String,
    enum : ["pdf","doc","docx"]
   },
   fileSize : Number,
   rawText : {
    type : String,
    default : ""
   },
   
   parsedData: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
},
   
}, {timestamps : true});


export default mongoose.model("Resume", resumeSchema);