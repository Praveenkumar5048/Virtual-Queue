import express from "express";
import { bookAppointment, getAllAppointments, updateAppointment, getAllUserAppointments} from "../controllers/appointment.controller.js";
import {authLoginCheck, authLogout} from "../middlewares/auth.middleware.js";

const router = express.Router();


router.post("/bookAppointment", bookAppointment);
router.get("/getQueueList/:doctorId", getAllAppointments);
router.put("/update/patient/status/:patientId", updateAppointment);
router.get("/getAllUserAppointments/:userId", getAllUserAppointments);

export default router;
