import React from 'react';
import '../assets/css/ViewReportHistory.css';

const ViewReportHistory = () => {
  // Sample static data
  const data = [
    {
      name: 'Ramu',
      age: 35,
      gender: 'Male',
      hospitalId: 12345,
      doctorId: 67890,
      diseases: 'Diabetes',
      reports: 'Link to Reports 1'
    },
    {
      name: 'shruthi',
      age: 40,
      gender: 'Female',
      hospitalId: 54321,
      doctorId: 98765,
      diseases: 'Hypertension',
      reports: 'Link to Reports 2'
    }
  ];

  return (
    <div className="view-report-history mt-3">
      <div className="view-report-history-table-responsive">
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Hospital ID</th>
              <th>Doctor ID</th>
              <th>Diseases</th>
              <th>Reports</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.gender}</td>
                <td>{item.hospitalId}</td>
                <td>{item.doctorId}</td>
                <td>{item.diseases}</td>
                <td>{item.reports}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewReportHistory;
