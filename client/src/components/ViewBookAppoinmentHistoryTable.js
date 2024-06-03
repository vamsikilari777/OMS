import React from 'react';
import '../assets/css/ViewBookAppoinmentHistory.css';

const ViewBookAppointmentHistory = () => {
  // Sample static data
  const data = [
    {
      appointmentId: 1,
      patientName: 'ramu',
      doctorName: 'Dr.Sai',
      date: '10/05/2024',
      time: '09:00 AM',
      status: 'Confirmed'
    },
    {
      appointmentId: 2,
      patientName: 'Raju',
      doctorName: 'Dr.Hari',
      date: '11/05/2024',
      time: '11:30 AM',
      status: 'Pending'
    },
    {
      appointmentId: 3,
      patientName: 'Rajini',
      doctorName: 'Dr.Hussian',
      date: '12/05/2024',
      time: '02:45 PM',
      status: 'Cancelled'
    }
  ];

  return (
    <div className="view-book-appointment-history">
      <div className="view-book-appointment-history-table-responsive">
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.appointmentId}</td>
                <td>{item.patientName}</td>
                <td>{item.doctorName}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewBookAppointmentHistory;
