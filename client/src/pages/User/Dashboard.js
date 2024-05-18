import Card from "react-bootstrap/Card";
import React from "react";
import axios from "axios";
import baseURL from "../../config";

class UserDashboard extends React.Component {
  state = {
    notifications: [],
  };

  componentDidMount() {
    this.fetchNotifications();
  }

  fetchNotifications = () => {
    axios
      .get(`${baseURL}/api/notifications`)
      .then((res) => {
        this.setState({ notifications: res.data });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { notifications } = this.state;
    console.log(notifications);

    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="mt-2 pt-4 pb-4 bg-dark text-light rounded-2">
          <Card>
            <Card.Header className="bg-secondary text-center">
              Notification
            </Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <div>
                  <h5>Hey You Got New Notification</h5>
                  <ul>
                    <p>
                      Basically This Column will recieve the updates from
                      hospital and doctors for your health Conditions
                    </p>
                    {notifications.map((notification, index) => (
                      <li key={index}>{notification.message}</li>
                    ))}
                  </ul>
                </div>
                <footer className="blockquote-footer">
                  Maintenance From
                  <cite title="Source Title"> MediMoniterx</cite>
                </footer>
              </blockquote>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default UserDashboard;
