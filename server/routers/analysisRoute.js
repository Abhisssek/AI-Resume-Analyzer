import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createAnalysis, getSingleAnalysis, getUserAnalysis, deleteAnalysis  } from "../controllers/analysisController.js";

const router = express.Router();

router.post("/", isAuthenticated, createAnalysis);
router.get("/", isAuthenticated, getUserAnalysis);
router.get("/:id", isAuthenticated, getSingleAnalysis);
router.delete("/:id", isAuthenticated, deleteAnalysis);

export default router;