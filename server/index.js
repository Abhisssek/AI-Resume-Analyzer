import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import  database  from "./db/db.js";
import cookieParser from "cookie-parser";



const app = express();


dotenv.config();
app.use(cors());
app.use(express.json())
app.use(cookieParser());

database();



import userRoutes from "./routers/userRoutes.js";
app.use("/api/users", userRoutes);



app.get("/", (req, res) => {
    res.send("Hello from server");
})

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on port ${process.env.PORT || 3001}`);
});