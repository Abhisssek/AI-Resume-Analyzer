import resumeSchema from "../models/resumeSchema.js";
import analysisSchema from "../models/analysisSchema.js";
import jobDescSchema from "../models/jobDescSchema.js";

import { analyzeResume } from "../services/aiServices.js";



export const createAnalysis = async (req, res) => {
    try {
        const { resumeId, jobDescId } = req.body;

        if (!resumeId || !jobDescId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const resume = await resumeSchema.findById(resumeId);
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        const jobDesc = await jobDescSchema.findById(jobDescId);
        if (!jobDesc) {
            return res.status(404).json({ message: "Job description not found" });
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


        return res.status(200).json({ message: "Analysis created successfully", analysis });


    } catch (error) {
        return res.status(500).json({ message: "Failed to create analysis", error: error.message });
    }
}