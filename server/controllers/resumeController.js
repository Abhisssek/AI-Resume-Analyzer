import User from "../models/userSchema.js";
import Resume from "../models/resumeSchema.js";
import cloudinary from "../services/cloudinary.js";
import streamifier from "streamifier";
import extractResumeText from "../utils/extractResumeText.js";
import { parseResume } from "../services/aiServices.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const rawText = await extractResumeText(req.file);
    const parsedData = await parseResume(rawText);


    // console.log(parsedData);
    

  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
        {
            resource_type: "raw",
            folder: "resume",
            use_filename: true,
            unique_filename: false
        },
        (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        }
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);
});




    const resume = await Resume.create({
            userId: req.user.id,
            fileName: req.file.originalname,
            fileUrl: result.secure_url,
            publicId: result.public_id,
            fileType: req.file.mimetype.includes("pdf") ? "pdf" : "docx",
            fileSize: req.file.size,
            rawText,
            parsedData
        });


        return res.status(201).json({
            success: true,
            message: "Resume uploaded successfully.",
            resume
        });


  } catch (error) {
    return res.status(500).json({ message: "Failed to upload resume", error: error.message });
  }
};



export const getAllResume = async (req,res)=>{
  try {
    const resumes = await Resume.find({userId: req.user.id});
    if(!resumes){
        return res.status(404).json({ message: "No resumes found" });
    }
    return res.status(200).json({ resumes });
  } catch (error) {
    res.status(500).json({ message: "Failed to get resumes", error: error.message });
  }
}


export const getResumeById = async (req,res)=>{
  try {
    const resume = await Resume.findById(req.params.id);
    if(!resume){
        return res.status(404).json({ message: "No resume found" });
    }
    return res.status(200).json({ resume });
  } catch (error) {
    res.status(500).json({ message: "Failed to get resume", error: error.message });
  }
}


export const deleteResume = async (req,res)=>{
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);
    if(!resume){
        return res.status(404).json({ message: "No resume found" });
    }
    return res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete resume", error: error.message });
  }
}