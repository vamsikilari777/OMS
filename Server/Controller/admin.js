const express = require("express");
const db = require("../db");
const cors = require("cors");
const router = express.Router();
const app = express();
app.use(cors());
app.use(express.json());

// Route to fetch all users
router.get("/allUsers", (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get the page parameter or default to 1
  const limit = parseInt(req.query.limit) || 5; // Get the limit parameter or default to 10
  const offset = (page - 1) * limit; // Calculate the offset for pagination
  // Execute the query with pagination parameters
  db.query(
    "SELECT * FROM users LIMIT ? OFFSET ?",
    [limit, offset],
    (err, results) => {
      if (err) {
        console.error("Error fetching users:", err);
        return res.status(500).send("Error fetching users from the database");
      }
      res.json(results); // Send the fetched users as JSON response
    }
  );
});

router.post("/register", (req, res) => {
  if (
    !req.body ||
    !req.body.username ||
    !req.body.email ||
    !req.body.password
  ) {
    return res.status(400).send("Username, email, and password are required");
  }

  const { username, email, password, role, hospital_name, location } = req.body;

  db.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send("Database error");
      }
      if (result.length > 0) {
        return res.status(400).send("Registration failed: Email already used");
      }

      db.query(
        "INSERT INTO users (username, email, password, role, hospital_name, location) VALUES (?, ?, ?, ?, ?, ?)",
        [username, email, password, role, hospital_name, location],
        (err, result) => {
          if (err) {
            console.error("Database error during user registration:", err);
            return res
              .status(500)
              .send("Database error during user registration");
          }
          res.send("User registered successfully");
        }
      );
    }
  );
});

// All Get operations (All Users )
router.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

router.get("/doctors", (req, res) => {
  db.query("SELECT * FROM doctor", (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

router.get("/hospitals", (req, res) => {
  db.query("SELECT * FROM hospital", (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// All Insert Operations
router.post("/users", (req, res) => {
  db.query("INSERT INTO users SET ?", req.body, (error, results) => {
    if (error) throw error;
    res.status(201).json({ id: results.id, ...req.body });
  });
});

router.post("/hospitals", (req, res) => {
  db.query("INSERT INTO hospital SET ?", req.body, (error, results) => {
    if (error) throw error;
    res.status(201).json({ id: results.id, ...req.body });
  });
});

//All Update Operations
router.put("/users/:id", (req, res) => {
  db.query(
    "UPDATE users SET ? WHERE id = ?",
    [req.body, req.params.id],
    (error, results) => {
      if (error) throw error;
      res.json(req.body);
    }
  );
});

router.put("/hospitals/:id", (req, res) => {
  db.query(
    "UPDATE hospital SET ? WHERE hospital_id = ?",
    [req.body, req.params.id],
    (error, results) => {
      if (error) throw error;
      res.json(req.body);
    }
  );
});

//All delete Operations
router.delete("/users/:id", (req, res) => {
  db.query(
    "DELETE FROM users WHERE id = ?",
    req.params.id,
    (error, results) => {
      if (error) throw error;
      res.status(204).send();
    }
  );
});

router.delete("/hospitals/:id", (req, res) => {
  db.query(
    "DELETE FROM hospital WHERE name = ?",
    req.params.id,
    (error, results) => {
      if (error) throw error;
      res.status(204).send();
    }
  );
});

// Fetches all Count of all users
router.get("/dashboard", (req, res) => {
  // Fetch counts from MySQL database
  db.query("SELECT COUNT(*) AS totalPatients FROM patient", (err, results) => {
    if (err) {
      throw err;
    }
    const totalPatients = results[0].totalPatients;
    //console.log("Patients: ",totalPatients)
    // Fetch doctors count
    db.query("SELECT COUNT(*) AS totalDoctors FROM doctor", (err, results) => {
      if (err) {
        throw err;
      }
      const totalDoctors = results[0].totalDoctors;
      //  console.log("Doctors: ",totalPatients)
      // Fetch hospitals count
      db.query(
        "SELECT COUNT(*) AS totalHospitals FROM hospital",
        (err, results) => {
          if (err) {
            throw err;
          }
          const totalHospitals = results[0].totalHospitals;
          // console.log("Hospitals: ",totalPatients)
          // Send all counts in JSON response
          res.json({
            totalPatients,
            totalDoctors,
            totalHospitals,
            // Add more data as
          });
        }
      );
    });
  });
});

module.exports = router;
