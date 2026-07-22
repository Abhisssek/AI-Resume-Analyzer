import express from "express";
import cors from "cors";
import "dotenv/config";
import  database  from "./db/db.js";
import cookieParser from "cookie-parser";
import isAuthenticated from "./middlewares/isAuthenticated.js";



const app = express();


// dotenv.config();
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
    }
));
app.use(express.json())
app.use(cookieParser());

database();



import userRoutes from "./routers/userRoutes.js";
import resumeRoutes from "./routers/resumeRouters.js";
import jobDescRoutes from "./routers/jobDescRoutes.js";
import analysisRoutes from "./routers/analysisRoute.js";

app.use("/api/users", userRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/jobDesc", jobDescRoutes);
app.use("/api/analysis", analysisRoutes);


// app.get("/", isAuthenticated, (req, res) => {
//     console.log(req.user);
//     res.send("Hello from server");
// })



app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on port ${process.env.PORT || 3001}`);
});