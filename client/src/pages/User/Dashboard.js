import Card from "react-bootstrap/Card"; // Import Card component from react-bootstrap
import React from "react"; // Import React
import axios from "axios"; // Import axios for making HTTP requests
import baseURL from "../../config"; // Import base URL for API requests

class UserDashboard extends React.Component {
  // Define the state with an empty array for notifications
  state = {
    notifications: [],
  };

  // Lifecycle method to fetch notifications when the component mounts
  componentDidMount() {
    this.fetchNotifications();
  }

  // Method to fetch notifications from the API
  fetchNotifications = () => {
    axios
      .get(`${baseURL}/api/notifications`) // Make a GET request to the API endpoint
      .then((res) => {
        this.setState({ notifications: res.data }); // Update state with fetched notifications
      })
      .catch((err) => console.log(err)); // Log any errors to the console
  };

  render() {
    const { notifications } = this.state; // Destructure notifications from state
    console.log(notifications); // Log notifications to the console for debugging

    return (
      <div className="d-flex justify-content-center align-items-center"> {/* Center the content */}
        <div className="mt-2 pt-4 pb-4 bg-dark text-light rounded-2"> {/* Style the container */}
          <Card>
            <Card.Header className="bg-secondary text-center"> {/* Card header with background and text styles */}
              Notification
            </Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0"> {/* Blockquote for styling */}
                <div>
                  <h5>Hey You Got New Notification</h5>
                  <ul>
                    <p>
                      Basically This Column will receive the updates from
                      hospital and doctors for your health Conditions
                    </p>
                    {/* Map over notifications and display each one in a list item */}
                    {notifications.map((notification, index) => (
                      <li key={index}>{notification.message}</li>
                    ))}
                  </ul>
                </div>
                <footer className="blockquote-footer"> {/* Footer for blockquote */}
                  Maintenance From
                  <cite title="Source Title"> MediMonitorx</cite> {/* Citation */}
                </footer>
              </blockquote>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default UserDashboard; // Export the UserDashboard component
