import axios from "axios";

export const api = axios.create({baseURL:
 import.meta.env.MODE === "production"
    ? "/api/"
    : "http://localhost:5000/api/",
headers: {
        "Content-Type": "application/json",
        "credentials": "include",
    },
 });