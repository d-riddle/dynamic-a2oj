import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://dynamic-a2oj.onrender.com/api/"
});