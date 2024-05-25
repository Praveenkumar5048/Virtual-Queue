import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    patientName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"],
    },
    contact: {
        type: String,
        required: true,
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now // The date of the booking
    },
    status: {
        type: String,
        required: true,
        enum: ["Pending", "CheckedIn", "Completed"],
        default: "Pending"
    }
}, { timestamps: true });

export const Appointment = mongoose.model("appointment", appointmentSchema); 