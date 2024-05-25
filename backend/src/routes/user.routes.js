import express from "express";
import { getUserDetails, getDoctorDetails } from "../controllers/user.controller.js";
import { login, register, logout } from "../controllers/login_logout.controller.js";
import { addNewAdmin } from "../controllers/admin.controller.js";


const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);






export default router;