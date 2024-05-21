import React, { useState } from "react"; //imported usestate hook from react
import { Box, Button, TextField, Typography } from "@mui/material"; // Import components from Material-UI
import "../../assets/css/ProfileSettings.css"; // Import custom CSS for profile settings

export default function AccountSettings() {
  // State variables for current username, new username, email, password, confirm password, and password match
  const [userName, setUserName] = useState("");
  const [newUserName, setNewUserName] = useState(""); // Add state for new username
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatch, setIsMatch] = useState(true);

  // Function to handle password change
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setIsMatch(event.target.value === confirmPassword);
  };

  // Function to handle confirm password change
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setIsMatch(event.target.value === password);
  };

  // Function to handle current username change
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  // Function to handle new username change
  const handleNewUserNameChange = (event) => {
    setNewUserName(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      userName, // Include new username in the form submission
      email,
      password,
      confirmPassword,
    });
    // Handle form submission here
  };

  return (
    <div className="Container">
      <Box padding="10" margin={0}>
        {/* Title */}
        <Typography variant="h5" gutterBottom alignContent={"center"}>
          Change Username and Password
        </Typography>
        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Current Username input */}
          <TextField
            label="Current Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userName}
            onChange={handleUserNameChange}
            required
          />
          {/* Email input */}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* New Password input */}
          <TextField
            label="New Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            error={!isMatch}
          />
          {/* Confirm Password input */}
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            error={!isMatch}
          />
          {/* Error message for password mismatch */}
          {!isMatch && (
            <Typography color="error" variant="body2" gutterBottom>
              Passwords do not match
            </Typography>
          )}
          {/* Save button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isMatch}
            style={{ marginTop: "10px" }}
          >
            Save
          </Button>
        </form>
      </Box>
    </div>
  );
}
