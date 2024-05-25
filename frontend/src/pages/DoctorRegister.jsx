import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineUser, AiOutlineMail, AiFillPhone, AiOutlineHome, AiOutlineFileText } from 'react-icons/ai';
import { BiMale, BiFemale } from 'react-icons/bi';
import {Navbar} from "../import-export/ImportExport";

function DoctorRegister() {

    const user = JSON.parse(localStorage.getItem('user'));

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
        } catch (error) {
            console.error('Error registering doctor:', error);
        }
    };

    return (
      <>
      <Navbar />
        <div className="max-w-md mx-auto bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-4">Doctor Registration Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="fullname" className=" text-gray-700 font-bold mb-2 flex items-center">
                        <AiOutlineUser className="mr-2" /> Full Name
                    </label>
                    <input type="text" id="fullname" name="fullname" value={formData.fullname} onChange={handleChange} required className="form-input mt-1 block w-full" />
                </div>
                <div>
                    <label htmlFor="hospital" className="text-gray-700 font-bold mb-2 flex items-center">
                        <AiOutlineHome className="mr-2" /> Hospital Name
                    </label>
                    <input type="text" id="hospital" name="hospitalname" value={formData.hospitalname} onChange={handleChange} required className="form-input mt-1 block w-full" />
                </div>
                <div>
                    <label htmlFor="email" className=" text-gray-700 font-bold mb-2 flex items-center">
                        <AiOutlineMail className="mr-2" /> Email Address
                    </label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="form-input mt-1 block w-full" />
                </div>
                <div>
                    <label htmlFor="phone" className=" text-gray-700 font-bold mb-2 flex items-center">
                        <AiFillPhone className="mr-2" /> Contact No
                    </label>
                    <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required minLength="10" maxLength="10" className="form-input mt-1 block w-full" />
                </div>
                <div>
                    <label htmlFor="address" className=" text-gray-700 font-bold mb-2 flex items-center">
                        <AiOutlineHome className="mr-2" /> Address
                    </label>
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required className="form-input mt-1 block w-full" />
                </div>
                <div>
                    <label htmlFor="gender" className=" text-gray-700 font-bold mb-2 flex items-center">
                        Gender
                    </label>
                    <div className="flex items-center">
                        <label className="mr-4">
                            <input type="radio" name="gender" value="Male" onChange={handleChange} className="mr-2" /> <BiMale className="inline-block" />
                            Male
                        </label>
                        <label>
                            <input type="radio" name="gender" value="Female" onChange={handleChange} className="mr-2" /> <BiFemale className="inline-block" />
                            Female
                        </label>
                    </div>
                </div>
                <div>
                    <label htmlFor="specializations" className=" text-gray-700 font-bold mb-2 flex items-center">
                        <AiOutlineFileText className="mr-2" /> Specialization
                    </label>
                    <input type="text" id="specializations" name="specializations" value={formData.specializations} onChange={handleChange} required className="form-input mt-1 block w-full" placeholder="e.g., Cardiology, Neurology" />
                </div>
                <div>
                    <label htmlFor="qualifications" className="text-gray-700 font-bold mb-2 flex items-center">
                        <AiOutlineFileText className="mr-2" /> Qualifications
                    </label>
                    <textarea id="qualifications" name="qualifications" value={formData.qualifications} onChange={handleChange} required className="form-textarea mt-1 block w-full"></textarea>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-2">Availability</h3>
                    {availability.map((slot, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input type="checkbox" checked={slot.available} onChange={() => handleCheckboxChange(index)} className="mr-2" />
                            <label className="mr-2">{slot.day}</label>
                            {slot.available && (
                                <>
                                    <input type="time" value={slot.start} onChange={(e) => handleAvailabilityChange(index, 'start', e.target.value)} className="form-input mr-2" />
                                    <input type="time" value={slot.end} onChange={(e) => handleAvailabilityChange(index, 'end', e.target.value)} className="form-input" />
                                </>
                            )}
                        </div>
                    ))}
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Register</button>
            </form>
        </div>
        </>
    );
}

export default DoctorRegister;




