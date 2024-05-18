import React, { useState } from "react";
import "../../assets/css/medicalReportForm.css";
import baseURL from "../../config";

function MedicalReportForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    hospital_id: "",
    doctor_id: "",
    diseases: "",
    reports: "", // Store the selected PDF file
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, reports: e.target.files[0] });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("age", formData.age);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("hospital_id", formData.hospital_id);
      formDataToSend.append("doctor_id", formData.doctor_id);
      formDataToSend.append("diseases", formData.diseases);
      formDataToSend.append("reports", formData.reports); // Ensure 'reports' matches the key expected by the backend

      const response = await fetch(`${baseURL}/api/report`, {
        method: "POST",
        body: formDataToSend,
      });

      // Check if response is not OK
      if (!response.ok) {
        const errorMessage = await response.text(); // Get the error message from the server
        throw new Error(errorMessage || "Error submitting medical report.");
      }

      // Success case: Clear form data
      alert("Medical report submitted successfully.");
      setFormData({
        name: "",
        age: "",
        gender: "",
        hospital_id: "",
        doctor_id: "",
        diseases: "",
        reports: "",
      });
    } catch (error) {
      alert(
        error.message ||
          "Error submitting medical report. Please try again later."
      );
      console.error(error);
    }
  };

  return (
    <div className="medical-report-form-container">
      <div className="form-sub-div">
        <h2>Medical Report Form</h2>
        <form onSubmit={handleSubmit} className="medical-report-form">
          <div className="form-group">
            <label htmlFor="patientName">Patient Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <br></br>
            <select
              className="select-one"
              type="select-one"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="hospital_id">Hospital ID:</label> <br></br>
            <select
              className="select-one"
              type="select-one"
              id="hospital_id"
              name="hospital_id"
              value={formData.hospital_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Hospital ID</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="doctor_id">Doctor ID:</label> <br></br>
            <select
              className="select-one"
              type="select-one"
              id="doctor_id"
              name="doctor_id"
              value={formData.doctor_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Doctor ID</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="diseases">Disease:</label> <br></br>
            <select
              className="select-one"
              type="select-one"
              id="diseases"
              name="diseases"
              value={formData.diseases}
              onChange={handleChange}
              required
            >
              <option value="">Select Disease</option>
              <option value="flu">Flu</option>
              <option value="cold">Cold</option>
              <option value="fever">Fever</option>
              <option value="headache">Headache</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="reports">PDF File:</label>
            <input
              type="file"
              id="reports"
              name="reports"
              accept=".pdf"
              // value={formData.reports}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}

export default MedicalReportForm;
