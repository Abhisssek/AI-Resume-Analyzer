import e from "express";
import jobDescSchema from "../models/jobDescSchema.js";


export const createJobDesc = async (req, res) => {
    try {

        const { jobTitle, jobDescription,company, sourceUrl } = req.body;

        if(!jobTitle || !jobDescription || !company) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const jobDesc = await jobDescSchema.create({
            userID: req.user.id,
            jobTitle,
            company,
            jobDescription,
            sourceUrl,
            
        });
        
        return res.status(200).json({ message: "Job description created successfully", jobDesc });
    } catch (error) {
        // console.log(error);
        return res.status(500).json({ message: "Failed to create job description", error: error.message });
    }
};


export const getAllJobDesc = async (req, res) => {
    try {
        const jobDescs = await jobDescSchema.find({ userID: req.user.id });

        if(!jobDescs || jobDescs.length === 0) {
            return res.status(404).json({ message: "No job descriptions found" });
        }

        return res.status(200).json({ jobDescs });
    } catch (error) {
        // console.log(error);
        console.log(req.user);
        
        return res.status(500).json({ message: "Failed to get job descriptions", error: error.message });
    }
};


export const getJobDescById = async (req, res) => {
    try {
        const jobDesc = await jobDescSchema.findById(req.params.id);

        if(!jobDesc || jobDesc.length === 0) {
            return res.status(404).json({ message: "No job description found" });
        }

        return res.status(200).json({ jobDesc });
    } catch (error) {
        // console.log(error);
        return res.status(500).json({ message: "Failed to get job description", error: error.message });
    }
};


export const deleteJobDesc = async (req, res) => {
    try {
        const jobDesc = await jobDescSchema.findByIdAndDelete(req.params.id);

        if(!jobDesc || jobDesc.length === 0) {
            return res.status(404).json({ message: "No job description found" });
        }

        return res.status(200).json({ message: "Job description deleted successfully" });
    } catch (error) {
        // console.log(error);
        return res.status(500).json({ message: "Failed to delete job description", error: error.message });
    }
}