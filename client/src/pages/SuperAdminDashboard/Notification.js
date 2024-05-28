import React from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../../assets/css/notification.css";
import baseURL from "../../config";
class App extends React.Component {
  state = {
    notifications: [],
    message: "",
  };

  handleInputChange = (event) => {
    this.setState({ message: event.target.value });
  };

  handleSendNotification = () => {
    const { message } = this.state;
    axios
      .post(`${baseURL}/api/notifications`, { message })
      .then((res) => {
        alert("Notification sent successfully!");
        // this.fetchNotifications();
        this.setState({ message: "" });
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to send notification");
      });
  };

  render() {
    const { message } = this.state;
    return (
      // <div>
      //   <input
      //     className="message-input"
      //     type="text"
      //     value={message}
      //     onChange={this.handleInputChange}
      //     placeholder="Enter message"
      //   />
      //   <button
      //     className="mt-2 send-notification-button"
      //     onClick={this.handleSendNotification}
      //   >
      //     Send Notification
      //   </button>
      // </div>
      <Card className="bg-dark text-light">
        <Card.Header>Notification Pannel</Card.Header>
        <Card.Body className="bg-secondary">
          <Card.Title>
            This Notification Mannaged by Higher Authorities
          </Card.Title>
          <Card.Text>
            <div>
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

export default App;
