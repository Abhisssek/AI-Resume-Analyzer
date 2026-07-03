import express from "express";
import upload from "../middlewares/multer.js";
import {
    uploadResume,
    // getAllResumes,
    // getResumeById,
    // deleteResume
} from "../controllers/resumeController.js";
import  isAuthenticated  from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Upload Resume
router.post(
    "/upload",
    isAuthenticated,
    upload.single("resume"),
    uploadResume
);

// Get all resumes of logged-in user
// router.get(
//     "/",
//     isAuthenticated,
//     getAllResumes
// );

// // Get a single resume
// router.get(
//     "/:id",
//     isAuthenticated,
//     getResumeById
// );

// // Delete a resume
// router.delete(
//     "/:id",
//     isAuthenticated,
//     deleteResume
// );

export default router;