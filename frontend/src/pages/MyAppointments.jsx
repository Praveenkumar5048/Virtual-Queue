import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { Navbar } from "../import-export/ImportExport";
import axios from "axios";
import '../../public/style-sheet/token.css';

function MyAppointments() {
    
    const user = JSON.parse(localStorage.getItem('user'));
    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        const getAllAppointments = async () => {
            try {
                const response = await axios.get(`http://localhost:5500/getAllAppointments${user?.userId}`);
                setTokens(response.data);
              } catch (error) {
                console.error("Error fetching tokens:", error);
              }
        }
        getAllAppointments();
    }, []);

    return (
        <>
           <Navbar />
           <div className="mx-4 lg:w-3/4 lg:mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="card">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Appointment Ticket</h2>
                
                    <p className="text-gray-600"><span className="font-semibold">Patient Name:</span> Praveen</p>
                    <p className="text-gray-600"><span className="font-semibold">Doctor Name:</span> Dr. Harish</p>
                    <p className="text-gray-600"><span className="font-semibold">Queue Number:</span> 50</p>
                
                </div>
            </div>
        </>
    )
}

export default MyAppointments;