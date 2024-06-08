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
                const response = await axios.get(`http://localhost:5500/appointment/getAllUserAppointments/${user?.userId}`);
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
           <div className="mx-4 lg:w-3/4 lg:mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {tokens.map((token, index) => (
                   <div key={index} className="bg-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
                        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Appointment Ticket</h2>
                        <div className="border-b-2 border-gray-200 mb-4 pb-2">
                            <p className="text-gray-700 text-lg"><span className="font-semibold">Patient Name:</span> {token.patientName}</p>
                            <p className="text-gray-700 text-lg"><span className="font-semibold">Doctor Name:</span> {token.doctorName}</p>
                            <p className="text-gray-700 text-lg"><span className="font-semibold">Date:</span> {token.date}</p>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <div className="bg-blue-100 text-secondary font-bold text-lg px-4 py-2 rounded-full">
                                Queue No: {token.queueNumber} 50
                            </div>
                            <div className={`text-lg px-4 py-2 rounded-full font-bold ${
                                token.status === 'Completed' ? 'bg-green-100 text-green-600' : 
                                token.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                                'bg-red-100 text-red-600'}`}>
                                {token.status}
                            </div>
                        </div>
                    </div>
                ))}
                
            </div>
        </>
    )
}

export default MyAppointments;