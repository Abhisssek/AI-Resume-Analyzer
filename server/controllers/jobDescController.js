import e from "express";
import jobDescSchema from "../models/jobDescSchema.js";
import { parseJobDescription } from "../services/aiServices.js";
import extractJobTextFromUrl from "../utils/extractJobTextFromUrl.js";


export const createJobDesc = async (req, res) => {
    try {

        const { jobTitle, jobDescription,company, sourceUrl } = req.body;
        // console.log(jobDescription);
        
        if(!jobTitle || !jobDescription || !company) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }
        
        let finalJobDescription = jobDescription;
        const isUrl = /^https?:\/\/.+/i.test(jobDescription);
        if(isUrl) {
            finalJobDescription = await extractJobTextFromUrl(jobDescription);
        }


        const jobDescriptionParsed = await parseJobDescription(finalJobDescription);

        const jobDesc = await jobDescSchema.create({
            userID: req.user.id,
            jobTitle,
            company,
            jobDescription: finalJobDescription,
            sourceUrl: isUrl ? jobDescription : "",
            parsedJobData: jobDescriptionParsed
            
        });
        
        return res.status(200).json({ message: "Job description created successfully", jobDesc, success: true });
    } catch (error) {
        // console.log(error);
        return res.status(500).json({ message: "Failed to create job description", error: error.message, success: false });
    }
};


export const getAllJobDesc = async (req, res) => {
    try {
        const jobDescs = await jobDescSchema.find({ userID: req.user.id });

        if(!jobDescs || jobDescs.length === 0) {
            return res.status(404).json({ message: "No job descriptions found", success: false });
        }

        return res.status(200).json({ jobDescs, success: true });
    } catch (error) {
        // console.log(error);
        console.log(req.user);
        
        return res.status(500).json({ message: "Failed to get job descriptions", error: error.message, success: false });
    }
};


export const getJobDescById = async (req, res) => {
    try {
        const jobDesc = await jobDescSchema.findById(req.params.id);

        if(!jobDesc || jobDesc.length === 0) {
            return res.status(404).json({ message: "No job description found", success: false });
        }

        return res.status(200).json({ jobDesc, success: true });
    } catch (error) {
        // console.log(error);
        return res.status(500).json({ message: "Failed to get job description", error: error.message, success: false });
    }
};


export const deleteJobDesc = async (req, res) => {
    try {
        const jobDesc = await jobDescSchema.findByIdAndDelete(req.params.id);

        if(!jobDesc || jobDesc.length === 0) {
            return res.status(404).json({ message: "No job description found", success: false });
        }

        return res.status(200).json({ message: "Job description deleted successfully", success: true });
    } catch (error) {
        // console.log(error);
        return res.status(500).json({ message: "Failed to delete job description", error: error.message, success: false });
    }
}