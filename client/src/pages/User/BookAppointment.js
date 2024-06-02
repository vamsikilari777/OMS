import React, { useState } from "react";
import "../../assets/css/AppointBookingForm.css";

function AppointmentBooking() {
  const initialFormData = {
    first_name: "",
    last_name: "",
    age: "",
    gender: "",
    email: "",
    date_of_appointment: "",
    time_of_appointment: "",
    hospital_name: "",
    doctor_name: "",
    appointment_type: "",
    address: "",
    mobile_no: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/bookAppointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form data submitted successfully");
        setFormData(initialFormData);
        setFormStatus({ submitted: true, error: "" });
      } else {
        throw new Error(`Failed to submit form data: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error submitting form data:", error.message);
      setFormStatus({ submitted: false, error: error.message });
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setFormStatus({ submitted: false, error: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container mt-4">
      <div className="card cards">
        <div className="card-header text-white">
          <h3 className="card-title">Appointment Details</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row p-3">
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  className="form-control form-controls"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  className="form-control form-controls"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  className="form-control form-controls"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="mobile_no"
                  placeholder="Phone Number"
                  className="form-control form-controls"
                  value={formData.mobile_no}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="date"
                  name="date_of_appointment"
                  className="form-control form-controls"
                  value={formData.date_of_appointment}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="time"
                  name="time_of_appointment"
                  className="form-control form-controls"
                  value={formData.time_of_appointment}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <select
                  name="hospital_name"
                  className="form-control form-controls"
                  value={formData.hospital_name}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled hidden>Select Hospital</option>
                  <option value="Amma Hospital">Amma Hospital</option>
                  <option value="Gouri Gopal Hospital">Gouri Gopal Hospital</option>
                  <option value="Suraksha Hospital">Suraksha Hospital</option>
                  <option value="RR Reddy ENT Hospital">RR Reddy ENT Hospital</option>
                  <option value="Dhurga Multi Speciality Hospital">Dhurga Multi Speciality Hospital</option>
                </select>
              </div>
              <div className="form-group">
                <select
                  name="doctor_name"
                  className="form-control form-controls"
                  value={formData.doctor_name}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled hidden>Select Doctor</option>
                  <option value="Dr. Hussain">Dr. Hussain</option>
                  <option value="Dr. Vamsi">Dr. Vamsi</option>
                  <option value="Dr. Harish">Dr. Harish</option>
                  <option value="Dr. Sharvan">Dr. Sharvan</option>
                  <option value="Dr. John">Dr. John</option>
                </select>
              </div>
              <div className="form-group">
                <select
                  name="gender"
                  className="form-control form-controls"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div className="form-group">
                <select
                  name="appointment_type"
                  className="form-control form-controls"
                  value={formData.appointment_type}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select Appointment Type</option>
                  <option value="Emergency Appointment">Emergency Appointment</option>
                  <option value="Basic Appointment">Basic Appointment</option>
                </select>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="form-control form-controls"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control form-controls"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row p-3">
            <div className="col-12 d-flex justify-content-end">
              <button type="submit" className="btn btn-primary mr-2">Submit</button>
              <button type="button" className="btn btn-danger" onClick={handleReset}>Reset</button>
            </div>
          </div>
        </form>
        {formStatus.error && (
          <div className="alert alert-danger mt-3">{formStatus.error}</div>
        )}
      </div>
    </div>
  );
}

export default AppointmentBooking;
