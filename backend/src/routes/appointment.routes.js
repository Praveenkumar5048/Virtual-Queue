import express from "express";
import { bookAppointment, getAllAppointments, updateAppointment} from "../controllers/appointment.controller.js";

const router = express.Router();


router.post("/bookAppointment", bookAppointment);
router.get("/getQueueList/:doctorId", getAllAppointments);
router.put("/update/patient/status/:patientId", updateAppointment);

export default router;
