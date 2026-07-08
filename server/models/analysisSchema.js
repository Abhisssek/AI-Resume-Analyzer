import mongoose from "mongoose";


const analysisSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    resumeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resume",
        required: true
    },
    jobDescId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobDesc",
        required: true
    },

    atsScore:{
        type: Number,
        default: 0
    },

    matchedKeywords: {
        type: [String],
        default: []
    },

    missingKeywords: {
        type: [String],
        default: []
    },

    strengths: {
        type: [String],
        default: []
    },

    weaknesses: {
        type: [String],
        default: []
    },

    sectionScores: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },

    suggestions: {
        type: [String],
        default: []
    },

    analysisSummary: {
        type: String,
        default: ""
    },
    


}, {timestamps: true})



export default mongoose.model("Analysis", analysisSchema)