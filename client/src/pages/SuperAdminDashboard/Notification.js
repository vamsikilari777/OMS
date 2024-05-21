import React from "react"; // Import React library
import axios from "axios"; // Import axios for making HTTP requests
import Card from "react-bootstrap/Card"; // Import Card component from react-bootstrap for UI layout
import Button from "react-bootstrap/Button"; // Import Button component from react-bootstrap
import "../../assets/css/notification.css"; // Import custom CSS for the notification component
import baseURL from "../../config"; // Import the base URL from the config file

class App extends React.Component {
  // Initialize state to store notifications and the message to be sent
  state = {
    notifications: [],
    message: "",
  };

  // Handle input change event for the message textarea
  handleInputChange = (event) => {
    this.setState({ message: event.target.value });
  };

  // Handle the send notification button click event
  handleSendNotification = () => {
    const { message } = this.state;
    // Make an HTTP POST request to send the notification
    axios
      .post(`${baseURL}/api/notifications`, { message })
      .then((res) => {
        // Show success alert if the notification is sent successfully
        alert("Notification sent successfully!");
        // Optionally, you can fetch notifications again to update the list
        // this.fetchNotifications();
        // Clear the message input after sending the notification
        this.setState({ message: "" });
      })
      .catch((err) => {
        // Log the error and show failure alert if the request fails
        console.error(err);
        alert("Failed to send notification");
      });
  };

  render() {
    const { message } = this.state; // Destructure message from state
    return (
      // Render the notification panel using a Card component
      <Card className="bg-dark text-light">
        <Card.Header>Notification Panel</Card.Header>
        <Card.Body className="bg-secondary">
          <Card.Title>
            This Notification Managed by Higher Authorities
          </Card.Title>
          <Card.Text>
            <div>
              {/* Textarea for entering the notification message */}
              <textarea
                className="message-input justify-center"
                type="text"
                rows="6"
                cols="70"
                wrap="soft"
                value={message}
                onChange={this.handleInputChange}
                placeholder="Enter message"
              />
            </div>
          </Card.Text>
          {/* Button to send the notification */}
          <Button
            variant="info"
            className="mt-2 send-notification-button"
            onClick={this.handleSendNotification}
          >
            Send
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default App; // Export the App component 
