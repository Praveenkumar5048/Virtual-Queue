import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { Navbar } from "../import-export/ImportExport";
import axios from "axios";

function AllDoctors() {
    const [searchQuery, setSearchQuery] = useState("");
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate();
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        // Perform search filtering based on searchQuery
        // Example: You can filter doctors based on name, specialization, etc.
    };

    useEffect(() => {
        const getAllDoctors = async () => {
            try {
                const response = await axios.get("http://localhost:5500/doctor/getAllDoctors");
                setDoctors(response.data);
              } catch (error) {
                console.error("Error fetching doctors:", error);
              }
        }
        getAllDoctors();
    }, []);
    
    return (
        <div>
            <Navbar />
            <div className=" ">
                <div className="w-3/4 mx-auto mt-12 mb-8">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search for doctors..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <div className="mx-4 lg:w-3/4 lg:mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map(doctor => (
                    <div key={doctor._id} className="border rounded-lg shadow-lg p-2 m-3 bg-white ">
                        {/* <img className="rounded-tl-lg rounded-tr-lg" src="/Image.png" alt={doctor.fullname} /> */}

                        <div className="flex flex-col p-4">
                            <h3 className="text-xl font-semibold">Dr. {doctor.fullname}</h3>
                            <span className="flex items-center">
                                <img src="/healthcare-occupation.svg" alt="icon" className="w-8 h-8 m-2" />
                                {doctor.qualifications}
                            </span>
                            <span className="flex items-center">
                                <img src="/healthcare-specialisation.svg" alt="icon" className="w-8 h-8 m-2" />
                                {doctor.specializations}
                            </span>
                            <span className="flex items-center">
                                <img src="/hospital-building.svg" alt="icon" className="w-8 h-8 m-2" />
                                {doctor.hospitalname}
                            </span>
                        </div>
                        <div className="flex justify-end p-4">
                            <button onClick={() => navigate(`/doctors/${doctor._id}`)} className="px-4 py-2 text-white bg-secondary rounded-md hover:bg-primary transition duration-300">Proceed</button>
                        </div>
                    </div>
                ))}

                </div>
            </div>
           
        </div>
    );
}

export default AllDoctors;
