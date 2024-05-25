import asyncHandler from "../utilis/asyncHandler.js";
import { Appointment } from "../models/appointment.model.js";
import { startOfDay, endOfDay } from 'date-fns';
import { io } from '../../app.js';

export const bookAppointment = asyncHandler(async (req, res, next) => {

    const { doctorId, patientName, age, gender, contact, bookedBy} = req.body;

    const newBooking = await Appointment.create({
        doctorId,
        patientName,
        age,
        gender,
        contact,
        bookedBy
    });

    res.status(201).json(newBooking);
});


export const updateAppointment = asyncHandler(async (req, res, next) => {

    const { patientId } = req.params;

    let updatedAppointment = await Appointment.findByIdAndUpdate(patientId, { status: "Completed" }, { new: true });

    if (updatedAppointment) {
        io.emit('appointmentUpdated', updatedAppointment); // Emit event to all clients
        res.status(200).json({ message: "Appointment marked as completed successfully" });
    } else {
        res.status(404).json({ message: "Appointment not found" });
    }
});

// Controller function for getting all appointments
export const getAllAppointments = asyncHandler(async (req, res, next) => {
    
    const currentDate = new Date();
    const startOfToday = startOfDay(currentDate);
    const endOfToday = endOfDay(currentDate);

    const doctorId = req.params.doctorId;
    const appointments = await Appointment.find({doctorId, date: { $gte: startOfToday, $lte: endOfToday }});
    
    res.status(200).json(appointments);
});