import express from "express";
import { RegisterDoctor, getAllDoctors, getDoctorDetails } from "../controllers/doctor.controller.js";

const router = express.Router();

router.post("/register", RegisterDoctor);
router.get("/getAllDoctors", getAllDoctors);
router.get("/getInfo/:doctorId", getDoctorDetails);

export default router;

