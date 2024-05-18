const express = require("express");
const db = require("../db");
const cors = require("cors");
const router = express.Router();
const app = express();
app.use(cors());
app.use(express.json());


router.get("/getAllAppointments", (req, res) => {
  db.query("SELECT * FROM appointments", (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});
// doctors Dashboard records count code

router.get("/getAllEmergencyCount", (req, res) => {
  db.query(
    "SELECT COUNT(*) AS emergencyCount FROM appointments WHERE appointment_type = ?",
    ["emergency appointment"],
    (error, results) => {
      if (error) {
        console.error("Error querying database:", error);
        res
          .status(500)
          .json({ error: "Failed to retrieve emergency appointment count" });
      } else {
        res.json({ emergencyCount: results[0].emergencyCount });
      }
    }
  );
});

router.get("/getAllAppointmentCount", (req, res) => {
  db.query(
    "SELECT COUNT(*) AS appointmentCount FROM patient ",
    (error, results) => {
      if (error) {
        console.error("Error querying database:", error);
        res
          .status(500)
          .json({ error: "Failed to retrieve emergency appointment count" });
      } else {
        res.json({ appointmentCount: results[0].appointmentCount });
      }
    }
  );
});

router.get("/getTodayAppointments", (req, res) => {
  const todayDate = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  db.query(
    "SELECT COUNT(*) AS appointmentCount FROM appointments WHERE date_of_appointment = ?",
    [todayDate],
    (error, results) => {
      if (error) {
        console.error("Error querying database:", error);
        res.status(500).json({ error: "Failed to retrieve appointment count" });
      } else {
        res.json({ appointmentCount1: results[0].appointmentCount }); // Make sure the key matches the one used in frontend
      }
    }
  );
});

router.get("/patients", (req, res) => {
  db.query("SELECT * FROM patient", (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

module.exports = router;
