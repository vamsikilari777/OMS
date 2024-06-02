import React from 'react';
import '../assets/css/ViewBookAppoinmentHistory.css';

const ViewBookAppointmentHistory = () => {
 

  return (
    <div className="view-book-appointment-history">
      <div className="view-book-appointment-history-table-responsive">
        <table className="view-book-appointment-history-table table-bordered">
          <thead>
            <tr>
              <th className="view-book-appointment-history-th">Appointment ID</th>
              <th className="view-book-appointment-history-th">Patient Name</th>
              <th className="view-book-appointment-history-th">Doctor Name</th>
              <th className="view-book-appointment-history-th">Date</th>
              <th className="view-book-appointment-history-th">Time</th>
              <th className="view-book-appointment-history-th">Status</th>
            </tr>
          </thead>
          <tbody className="view-book-appointment-history-tbody">
           
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewBookAppointmentHistory;
