import express, { json } from "express"
import { getAllStudents , getStudentWithId , deleteStudent , addStudent , changStudent } from "../controllers/students.js";

const router = express.Router();

router.get("/",getAllStudents );

router.get("/:id",getStudentWithId);

router.delete("/:id", deleteStudent);

router.post("/", addStudent);

router.patch("/:id", changStudent);

export default router ;

