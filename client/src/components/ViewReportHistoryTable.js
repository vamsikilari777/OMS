import React from 'react';
import '../assets/css/ViewReportHistory.css';

const ViewReportHistory = () => {
  return (
    <div className="view-report-history mt-3">
      <div className="view-report-history-table-responsive">
        <table className="view-report-history-table table-bordered">
          <thead className="view-report-history-thead-light">
            <tr>
              <th className="view-report-history-th">Name</th>
              <th className="view-report-history-th">Age</th>
              <th className="view-report-history-th">Gender</th>
              <th className="view-report-history-th">Hospital ID</th>
              <th className="view-report-history-th">Doctor ID</th>
              <th className="view-report-history-th">Diseases</th>
              <th className="view-report-history-th">Reports</th>
            </tr>
          </thead>
          <tbody className="view-report-history-tbody">
            {/* Add rows here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewReportHistory;
