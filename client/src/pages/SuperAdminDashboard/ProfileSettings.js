import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import "../../assets/css/ProfileSettings.css";

export default function AccountSettings() {
  const [userName, setUserName] = useState("");
  const [newUserName, setNewUserName] = useState(""); // Add state for new username
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatch, setIsMatch] = useState(true);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setIsMatch(event.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setIsMatch(event.target.value === password);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleNewUserNameChange = (event) => {
    // Function to handle new username change
    setNewUserName(event.target.value);
  };

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
        <Typography variant="h5" gutterBottom alignContent={"center"}>
          Change Username and Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Current Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userName}
            onChange={handleUserNameChange}
            required
          />
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
          {!isMatch && (
            <Typography color="error" variant="body2" gutterBottom>
              Passwords do not match
            </Typography>
          )}
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
