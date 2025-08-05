import axios from "axios";
const API_URL = "http://localhost:3000/api/students";

export const getAllStudents = () => axios.get(API_URL);
export const addStudent = (data) => axios.post(API_URL, data);
