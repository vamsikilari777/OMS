import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewReportHistory from '../../components/ViewReportHistoryTable';
import ViewBookAppointmentHistory from '../../components/ViewBookAppoinmentHistoryTable';
import '../../assets/css/History.css';

const History = () => {
  // State to manage the visibility of the report history and appointment booking tables
  const [showReportHistory, setShowReportHistory] = useState(false);
  const [showAppointmentHistory, setShowAppointmentHistory] = useState(false);

  // Function to show the report history table
  const handleShowReportHistory = () => {
    setShowReportHistory(true);
    setShowAppointmentHistory(false);
  };

  // Function to show the appointment booking table
  const handleShowAppointmentHistory = () => {
    setShowReportHistory(false);
    setShowAppointmentHistory(true);
  };

  return (
    <div className="history-container">
      {/* Button container */}
      <div className="history-buttons">
        {/* Button to show the report history table */}
        <button className="btn btn-primary" onClick={handleShowReportHistory}>
          Reports History
        </button>
        
        {/* Button to show the appointment booking table */}
        <button className="btn btn-success" onClick={handleShowAppointmentHistory}>
          Appointment History
        </button>
      </div>

      {/* Conditionally render the report history table if showReportHistory is true */}
      {showReportHistory && (
        <div className="history-table-responsive">
          <ViewReportHistory />
        </div>
      )}
      
      {/* Conditionally render the appointment booking table if showAppointmentHistory is true */}
      {showAppointmentHistory && (
        <div className="history-table-responsive">
          <ViewBookAppointmentHistory />
        </div>
      )}
    </div>
  );
};

export default History;
