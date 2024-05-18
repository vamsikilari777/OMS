import React, { useState } from "react";
import { Button, Card, Container, Form, ListGroup } from "react-bootstrap";
import ReminderModal from "../../modals/ReminderModal";

const NotificationsPage = () => {
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState("");

  // Function to add a new reminder
  const addReminder = () => {
    if (newReminder.trim() !== "") {
      setReminders([...reminders, newReminder.trim()]);
      setNewReminder("");
    }
  };

  // Function to delete a reminder
  const deleteReminder = (index) => {
    const updatedReminders = [...reminders];
    updatedReminders.splice(index, 1);
    setReminders(updatedReminders);
  };

  // Function to send out reminders
  const sendReminders = () => {
    // Implement logic to send out reminders
    // For demonstration purpose, just showing an alert
    alert("Reminders sent!");
  };

  return (
    <Container>
      <h1 className="mt-5">Notifications</h1>
      <Card className="mt-4">
        <Card.Body>
          <Card.Title>Send Appointment Reminders</Card.Title>
          <Form.Group controlId="reminderForm">
            <Form.Control
              type="text"
              placeholder="Enter reminder message"
              value={newReminder}
              onChange={(e) => setNewReminder(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={addReminder}>
            Add Reminder
          </Button>
          <Button variant="success" className="ml-2" onClick={sendReminders}>
            Send Reminders
          </Button>
        </Card.Body>
      </Card>
      <Card className="mt-4">
        <Card.Body>
          <Card.Title>Manage Reminders</Card.Title>
          <ListGroup>
            {reminders.map((reminder, index) => (
              <ListGroup.Item
                key={index}
                className="d-flex justify-content-between align-items-center"
              >
                {reminder}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteReminder(index)}
                >
                  Delete
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      {/* Reminder Modal */}
      <ReminderModal
        show={showReminderModal}
        onHide={() => setShowReminderModal(false)}
      />
    </Container>
  );
};

export default NotificationsPage;
