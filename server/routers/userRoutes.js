import { register, login, logout, checkAuh } from "../controllers/userController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login );
router.get("/logout", logout);
router.get("/check-auth", isAuthenticated, checkAuh);

export default router;
