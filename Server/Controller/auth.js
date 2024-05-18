const express = require("express");
const db = require("../db");
const cors = require("cors");
const app = express();
const multer = require("multer");
const path = require("path");
const util = require("util");
const router = express.Router();

app.use(cors()); 


router.post("/register", (req, res) => {
  if (
    !req.body ||
    !req.body.username ||
    !req.body.email ||
    !req.body.password
  ) {
    return res.status(400).send("Username, email, and password are required");
  }

  const { username, email, mobile, password, confirm_password, role } =
    req.body;

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
        "INSERT INTO users (username, email, mobile, password, confirm_password, role) VALUES (?, ?, ?, ?, ?, ?)",
        [username, email, mobile, password, confirm_password, role],
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

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send("Database error");
      }

      if (results.length === 0) {
        return res.status(401).send("Invalid email or password");
      }

      const user = results[0];
      // Check user's role and respond accordingly
      if (user.role === "admin") {
        return res.send({ message: "Admin login successful", user });
      } else if (user.role === "doctor") {
        return res.send({ message: "Doctor login successful", user });
      } else if (user.role === "reception") {
        return res.send({ message: "Reception login successful", user });
      } else if (user.role === "user") {
        return res.send({ message: "User login successful", user });
      } else {
        return res.status(403).send("Invalid role");
      }
    }
  );
});

// Logout endpoint
router.post("/logout", (req, res) => {
  // Destroy session on logout
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).send("Error destroying session");
    }
    res.send("Logout successful");
  });
});

// Endpoint to send notification to all users
router.post("/notifications", (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).send("Message is required");
  }
  const sql = "INSERT INTO notifications (message) VALUES (?)";
  db.query(sql, [message], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({
      message: "Notification sent to all users",
      count: result.affectedRows,
    });
  });
});

// Get notifications for all users
router.get("/notifications", (req, res) => {
  db.query("SELECT message FROM notifications", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Define multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set the destination folder for uploaded PDF files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/report", upload.single("reports"), (req, res) => {
  try {
    const { name, age, gender, hospital_id, doctor_id, diseases } = req.body;

    // Check if file was uploaded
    if (!req.file) {
      throw new Error("No file uploaded.");
    }

    const pdfPath = req.file.path; // Path to the uploaded PDF file

    const sql = `INSERT INTO patient (name, age, gender, hospital_id, doctor_id, diseases, reports) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      name,
      age,
      gender,
      hospital_id,
      doctor_id,
      diseases,
      pdfPath,
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Error submitting medical report" });
      } else {
        console.log("Medical report submitted successfully");
        res
          .status(200)
          .json({ message: "Medical report submitted successfully" });
      }
    });
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).json({ error: "Error handling file upload" });
  }
});

// Serve uploaded PDF files statically
router.use("/uploads", express.static(path.join(__dirname, "uploads")));

router.get("/reports", (req, res) => {
  db.query("SELECT * FROM patient", (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

const query = util.promisify(db.query).bind(db);

router.get("/pdf/:id", async (req, res) => {
  const reportId = req.params.id;
  try {
    const result = await query(
      "SELECT reports FROM patient WHERE patient_id = ?",
      [reportId]
    );
    if (result.length > 0) {
      res.setHeader("Content-Type", "application/pdf");
      res.send(result[0].reports); // Assuming reports is the column storing the BLOB data
    } else {
      res.status(404).send("Report not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Define route handlers
router.post("/bookAppointments", (req, res) => {
  console.log("entered");
  db.query("INSERT INTO appointments SET ?", req.body, (err, results) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).send("Error inserting data into the database");
    }
    res.json(results); // Send the inserted data as JSON response
  });
});

module.exports = router;
