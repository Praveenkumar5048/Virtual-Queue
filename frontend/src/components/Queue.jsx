import React, {useEffect} from 'react';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:5500");

function Queue({ bookings, setBookings}) {

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    socket.on('appointmentUpdated', (updatedAppointment) => {
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking._id === updatedAppointment._id ? updatedAppointment : booking
        )
      );
    });

    return () => {
      socket.off('appointmentUpdated');
    };
  }, [setBookings]);

  return (
    <>
    
    <div className="bg-white shadow-md rounded p-4 mx-4 lg:w-3/4 lg:mx-auto border-2 border-secondary mt-8">
      <h3 className="text-xl font-semibold mb-4 text-center">Today's Virtual Queue</h3>
      <div className="flex items-center justify-center mb-4">
        <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
        <p className="text-sm font-semibold mr-4">Your Turn</p>
        <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
        <p className="text-sm font-semibold">Completed</p>
      </div>
      <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-2 mt-4">
        {bookings.map((booking, index) => (
          <div
            key={booking._id}
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              booking.bookedBy === user?.userId ? 'bg-green-500' : 'bg-gray-200'}
              ${booking.status === 'Completed' && 'bg-red-500' } `}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default Queue;