import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createAnalysis } from "../controllers/analysisController.js";

const router = express.Router();

router.post("/", isAuthenticated, createAnalysis);

export default router;