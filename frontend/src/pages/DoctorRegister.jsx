import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineMail, AiFillPhone } from 'react-icons/ai';
import { GrBook, GrAchievement } from "react-icons/gr";
import { FaRegAddressBook, FaRegHospital } from "react-icons/fa";
import {Navbar} from "../import-export/ImportExport";

function DoctorRegister() {

    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userId: user?.userId,
        fullname: '',
        hospitalname: '',
        email: '',
        phone: '',
        address: '',
        gender: '',
        specializations: '',
        qualifications: '',
        availability: []
    });

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const initialAvailability = daysOfWeek.map(day => ({ day, available: false, start: '', end: '' }));

    const [availability, setAvailability] = useState(initialAvailability);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAvailabilityChange = (index, field, value) => {
        const updatedAvailability = [...availability];
        updatedAvailability[index] = { ...updatedAvailability[index], [field]: value };
        setAvailability(updatedAvailability);
    };

    const handleCheckboxChange = (index) => {
        const updatedAvailability = [...availability];
        updatedAvailability[index].available = !updatedAvailability[index].available;
        setAvailability(updatedAvailability);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const selectedAvailability = availability
            .filter(slot => slot.available && slot.start && slot.end)
            .map(slot => ({ day: slot.day, start: slot.start, end: slot.end }));
        
        try {
            const response = await axios.post('http://localhost:5500/doctor/register', {
                ...formData,
                availability: selectedAvailability
            });
            alert('Doctor registered successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error registering doctor:', error);
        }
    };

    return (
      <>
      <Navbar />
        <div className="sm:w-3/5 mx-auto bg-secondary shadow-md rounded p-5 sm:my-10">
            <h2 className="text-2xl font-bold mb-4">Doctor Registration Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className='flex flex-col sm:flex-row gap-4'>
                <div className='left-box mr-4'>
                    <div>
                        <label htmlFor="fullname" className=" text-gray-700 font-bold mb-2 flex items-center">
                            <AiOutlineUser className="mr-2" /> Full Name
                        </label>
                        <input type="text" id="fullname" name="fullname" value={formData.fullname} onChange={handleChange} required placeholder="Dr. XYZ" className="rounded p-1 mb-2 w-full sm:w-96" />
                    </div>
                    <div>
                        <label htmlFor="hospital" className="text-gray-700 font-bold mb-2 flex items-center">
                            <FaRegHospital className="mr-2" /> Hospital Name
                        </label>
                        <input type="text" id="hospital" name="hospitalname" value={formData.hospitalname} onChange={handleChange} required className="rounded p-1 mb-2 w-full sm:w-96" />
                    </div>
                    <div>
                        <label htmlFor="email" className=" text-gray-700 font-bold mb-2 flex items-center">
                            <AiOutlineMail className="mr-2" /> Email Address
                        </label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="rounded p-1 mb-2 w-full sm:w-96" />
                    </div>
                    <div>
                        <label htmlFor="phone" className=" text-gray-700 font-bold mb-2 flex items-center">
                            <AiFillPhone className="mr-2" /> Contact No
                        </label>
                        <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required minLength="10" maxLength="10" className="rounded p-1 mb-2 w-full sm:w-96" />
                    </div>
                    <div>
                        <label htmlFor="address" className=" text-gray-700 font-bold mb-2 flex items-center">
                            <FaRegAddressBook className="mr-2" /> Hospital Address
                        </label>
                        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required className="rounded p-1 mb-2 w-full sm:w-96" />
                    </div>
                    <div>
                        <label htmlFor="gender" className=" text-gray-700 font-bold mb-2 flex items-center">
                            Gender
                        </label>
                        <div className="flex items-center">
                            <label className="mr-4">
                                <input type="radio" name="gender" value="Male" onChange={handleChange} className="mr-2" /> 
                                Male
                            </label>
                            <label>
                                <input type="radio" name="gender" value="Female" onChange={handleChange} className="mr-2" />
                                Female
                            </label>
                        </div>
                    </div>
                </div>
                <div className='right-box sm:ml-4'>
                    <div>
                        <label htmlFor="specializations" className=" text-gray-700 font-bold mb-2 flex items-center">
                            <GrAchievement className="mr-2" /> Specialization
                        </label>
                        <input type="text" id="specializations" name="specializations" value={formData.specializations} onChange={handleChange} required className="rounded p-1 mb-2 w-full sm:w-96" placeholder="e.g., Cardiology, Neurology" />
                    </div>
                    <div>
                        <label htmlFor="qualifications" className="text-gray-700 font-bold mb-2 flex items-center">
                            <GrBook className="mr-2" /> Qualifications
                        </label>
                        <textarea id="qualifications" name="qualifications" value={formData.qualifications} onChange={handleChange} required className="rounded p-1 mb-2 w-full sm:w-96"></textarea>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">Available On</h3>
                        {availability.map((slot, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input type="checkbox" checked={slot.available} onChange={() => handleCheckboxChange(index)} className="mr-2" />
                                <label className="mr-2">{slot.day}</label>
                                {slot.available && (
                                    <>
                                    <label>From </label><input type="time" value={slot.start} onChange={(e) => handleAvailabilityChange(index, 'start', e.target.value)} className="rounded mx-2 pl-2" />
                                    <label>To </label><input type="time" value={slot.end} onChange={(e) => handleAvailabilityChange(index, 'end', e.target.value)} className="rounded mx-2 pl-2" />
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded">Register</button>
            </form>
        </div>
        </>
    );
}

export default DoctorRegister;




