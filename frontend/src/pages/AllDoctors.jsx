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
            <div className="container mx-auto px-4">
                <div className="w-3/4 mx-auto mt-12 mb-8">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search for doctors..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {doctors.map(doctor => (
                        <div key={doctor._id} className="team-item">
                        <div className="bg-light rounded overflow-hidden">
                            <div className="h-full">
                                <img className="h-full object-cover" src="team-2.jpg" alt={doctor.fullname} />
                            </div>
                            <div className="flex flex-col justify-between h-full p-4">
                                <div>
                                    <h3> Dr. {doctor.fullname}</h3>
                                    <h6 className="text-primary italic mb-4">{doctor.qualifications}</h6>
                                    <h6 className="text-primary italic mb-4">{doctor.specializations}</h6>
                                    <p className="m-0">{doctor.hospitalname}</p>
                                
                                </div>
                               
                            </div>
                            <button onClick={() => navigate(`/doctors/${doctor._id}`)}  className="p-2 bg-green-400 rounded-md">Proceed</button>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
           
        </div>
    );
}

export default AllDoctors;
