import resumeSchema from "../models/resumeSchema.js";
import analysisSchema from "../models/analysisSchema.js";
import jobDescSchema from "../models/jobDescSchema.js";

import { analyzeResume } from "../services/aiServices.js";



export const createAnalysis = async (req, res) => {
    try {
        const { resumeId, jobDescId } = req.body;

        if (!resumeId || !jobDescId) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const resume = await resumeSchema.findById(resumeId);
        if (!resume) {
            return res.status(404).json({ message: "Resume not found", success: false });
        }
        const jobDesc = await jobDescSchema.findById(jobDescId);
        if (!jobDesc) {
            return res.status(404).json({ message: "Job description not found", success: false });
        }

        const analysisResult = await analyzeResume(resume.parsedData, jobDesc.jobDescription);

        const analysis = await analysisSchema.create({
            userId: req.user.id,
            resumeId,
            jobDescId,
            
            atsScore: analysisResult.atsScore,

            matchedKeywords: analysisResult.matchedKeywords,

            missingKeywords: analysisResult.missingKeywords,

            strengths: analysisResult.strengths,

            weaknesses: analysisResult.weaknesses,

            sectionScores: analysisResult.sectionScores,

            suggestions: analysisResult.suggestions,

            analysisSummary: analysisResult.analysisSummary
        });


        return res.status(200).json({ message: "Analysis created successfully", analysis, success: true });


    } catch (error) {
        return res.status(500).json({ message: "Failed to create analysis", error: error.message, success: false });
    }
}

export const getUserAnalysis = async (req, res) => {
    try {
        
        
        const analysis = await analysisSchema.find({ userId: req.user.id }).populate("resumeId", "fileName").populate("jobDescId", "jobTitle company");
        
        // console.log("running");
        
        // console.log(analysis);

        if (!analysis || analysis.length === 0) {
            return res.status(404).json({ message: "Analysis not found", success: false });
        }

        // console.log("running");
        
        // console.log(analysis);

        // console.log(analysis.uderId);
        
        if(analysis[0].userId.toString() === undefined) {
            return res.status(404).json({ message: "Analysis not found", success: false });
        }


        

         if (analysis[0].userId.toString() !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }

        // console.log("running");
        

        return res.status(200).json({ analysis, message: "Analysis fetched successfully", success: true });
    } catch (error) {
        return res.status(500).json({ message: "Failed to get analysis", error: error.message, success: false });
    }
}

export const getSingleAnalysis = async (req, res) => {
    try {
        const analysis = await analysisSchema.findById(req.params.id).populate("resumeId", "fileName").populate("jobDescId", "jobTitle company");

        if (!analysis || analysis.length === 0) {
            return res.status(404).json({ message: "Analysis not found", success: false });
        }

        if(analysis.userId.toString() === undefined) {
            return res.status(404).json({ message: "Analysis not found", success: false });
        }

        if (analysis.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }

        return res.status(200).json({ analysis, message: "Analysis fetched successfully", success: true });
    } catch (error) {
        return res.status(500).json({ message: "Failed to get analysis", error: error.message, success: false });
    }
}


export const deleteAnalysis = async (req, res) => {
    try {
        const analysis = await analysisSchema.findById(req.params.id);

        if (!analysis || analysis.length === 0) {
            return res.status(404).json({ message: "Analysis not found", success: false });
        }

        if (analysis.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }

        await analysis.deleteOne();

        return res.status(200).json({ message: "Analysis deleted successfully", success: true });
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete analysis", error: error.message, success: false });
    }
}