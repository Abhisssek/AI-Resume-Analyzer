import mongoose from "mongoose";



const experienceSchema = new mongoose.Schema({
    company: String,
    position: String,
    duration: String,
    description: String
}, { _id: false });

const educationSchema = new mongoose.Schema({
    degree: String,
    institution: String,
    year: String,
    cgpa: String
}, { _id: false });

const parsedDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    skills: [String],
    experience: [experienceSchema],
    education: [educationSchema]
}, { _id: false });

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
   parseData: parsedDataSchema,
   
}, {timestamps : true});


export default mongoose.model("Resume", resumeSchema);