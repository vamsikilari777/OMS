const express = require("express");
const cors = require("cors");
const routes = require("./Controller/auth");
const adminRoutes = require("./Controller/admin");
const doctorRoutes = require("./Controller/doctor");

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS
app.use(cors({
  origin: ['http://localhost:3000', 'https://medimonitorx.vercel.app'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use(express.json());

// Use routes
app.use("/api", routes);
app.use("/admin", adminRoutes);
app.use("/doctor", doctorRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
