import User from "../models/userSchema.js";
import Resume from "../models/resumeSchema.js";
import cloudinary from "../services/cloudinary.js";
import streamifier from "streamifier";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

//     console.log(process.env.CLOUDINARY_API_KEY);
// console.log(cloudinary.config());

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
            rawText: "",
            parsedData: {}
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
