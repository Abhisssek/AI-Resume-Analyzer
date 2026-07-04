import mongoose from "mongoose";


const jobDescSchema = new mongoose.Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    jobTitle:{
        type: String,
        trim: true,
        default: ""
    },
    company:{
        type: String,
        trim: true,
        default: ""
    },
    jobDescription:{
        type: String,
        trim: true,
        default: ""
    },
    rawText:{
        type: String,
        trim: true,
        default: ""
    },
    sourceUrl:{
        type: String,
        trim: true,
        default: ""
    },
    extractedKeywords:{
        type: [String],
        // trim: true,
        default: []
    }
}, {timestamps: true});



export default mongoose.model("JobDesc", jobDescSchema)