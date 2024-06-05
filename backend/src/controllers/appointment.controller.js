import asyncHandler from "../utilis/asyncHandler.js";
import { Appointment } from "../models/appointment.model.js";
import { startOfDay, endOfDay } from 'date-fns';
import { io } from '../../app.js';
import twilio from 'twilio';

const accountSid = process.env.accountSid;  
const authToken = process.env.authToken;  
const client = new twilio(accountSid, authToken);

export const bookAppointment = asyncHandler(async (req, res, next) => {

    const { doctorId, patientName, age, gender, contact, bookedBy} = req.body;

    try {
        const appointment = new Appointment({
            doctorId,
            patientName,
            age,
            gender,
            contact,
            bookedBy
        });

        await appointment.save();

        // Send SMS via Twilio
        const message = await client.messages.create({
            body: `Hello ${patientName}, your appointment with doctor ID: ${doctorId} has been booked successfully.`,
            to: '+91' + contact,    
            from: process.env.number  
        });

        res.status(200).json({ message: 'Appointment booked and SMS sent successfully', appointment });
    } catch (error) {
        console.error('Error booking appointment or sending SMS:', error);
        res.status(500).json({ error: 'Failed to book appointment and send SMS' });
    }
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