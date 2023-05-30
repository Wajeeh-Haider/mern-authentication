import isAuthenticated from "../middleware/auth.js";

import {
  createStudent,
  getStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} from "../controllers/StudentsC.js";
import express from "express";
const studentRoutes = express.Router();

studentRoutes.get("/", getStudents);
studentRoutes.post("/", createStudent);
studentRoutes.get("/:id", isAuthenticated, getStudent);
studentRoutes.put("/:id", isAuthenticated, updateStudent);
studentRoutes.delete("/:id", isAuthenticated, deleteStudent);

export default studentRoutes;
