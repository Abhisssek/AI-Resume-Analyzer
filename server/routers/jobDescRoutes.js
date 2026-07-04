import express from "express";
import { getAllJobDesc, getJobDescById, createJobDesc, deleteJobDesc } from "../controllers/jobDescController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/",isAuthenticated, getAllJobDesc);
router.get("/:id",isAuthenticated, getJobDescById);
router.post("/",isAuthenticated, createJobDesc);
router.delete("/:id",isAuthenticated, deleteJobDesc);


export default router;