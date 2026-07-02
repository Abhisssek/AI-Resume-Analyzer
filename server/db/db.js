import mongoose from "mongoose";

function db(){
    mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("db connected"))
    .catch((err) => console.log(err));
}


export default db