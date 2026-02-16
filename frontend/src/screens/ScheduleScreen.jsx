import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Form, Card } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listSchedules } from '../actions/scheduleActions';
import '../styles/schedule.css';

function ScheduleScreen() {
  const dispatch = useDispatch();
  
  const scheduleList = useSelector(state => state.scheduleList);
  const { loading, error, schedules } = scheduleList;

  const [selectedDays, setSelectedDays] = useState({
    Mon: false, Tue: false, Wed: false, Thu: false, Fri: false, Sat: false, Sun: false
  });
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [file, setFile] = useState(null);
  const [options, setOptions] = useState({
    recurring: true,
    notifications: true,
    public: true
  });

  useEffect(() => {
    dispatch(listSchedules());
  }, [dispatch]);

  const toggleDay = (day) => {
    setSelectedDays(prev => ({ ...prev, [day]: !prev[day] }));
  };

  const handleOptionChange = (e) => {
    setOptions(prev => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleSaveSchedule = (e) => {
    e.preventDefault();

    console.log({
      location,
      selectedDays,
      startTime,
      endTime,
      options,
      file
    });
  };

  return (
    <div className="schedule-container py-4">
      <div className="mb-5">
        <h1 className="display-4 fw-bold">SpotLight</h1>
        <p className="text-muted">Academic Schedule Builder</p>
      </div>

      {/* Main two-column layout */}
      <Row className="mb-4">
        {/* kaliwa column: Create New Schedule */}
        <Col md={6} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title className="fs-5 fw-semibold mb-2">Create New Schedule</Card.Title>
              <Card.Text className="text-muted mb-3">Build and upload academic schedules for campus buildings and venues</Card.Text>
              <ul className="list-unstyled space-y-2">
                <li className="d-flex align-items-center">
                  <span className="badge bg-success rounded-circle me-2">✓</span>
                  Easy to use
                </li>
                <li className="d-flex align-items-center">
                  <span className="badge bg-success rounded-circle me-2">✓</span>
                  Auto-validation
                </li>
                <li className="d-flex align-items-center">
                  <span className="badge bg-success rounded-circle me-2">✓</span>
                  Instant upload
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        {/* kanan column: Schedule Details */}
        <Col md={6} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="fs-5 fw-semibold mb-4">Schedule Details</Card.Title>
              
              <Form.Group className="mb-4">
                <Form.Label className="fw-medium">Building Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Science Hall, Room 101"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-medium mb-2">Day of the Week</Form.Label>
                <div className="d-flex flex-wrap gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <Button
                      key={day}
                      variant={selectedDays[day] ? 'primary' : 'light'}
                      size="sm"
                      onClick={() => toggleDay(day)}
                      className="rounded-pill"
                    >
                      {day}
                    </Button>
                  ))}
                </div>
              </Form.Group>

              <Row>
                <Col xs={6}>
                  <Form.Group>
                    <Form.Label className="fw-medium">Start Time</Form.Label>
                    <Form.Control
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group>
                    <Form.Label className="fw-medium">End Time</Form.Label>
                    <Form.Control
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* iba pa Options */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Card.Title className="fs-5 fw-semibold mb-3">Additional Options</Card.Title>
          <Form>
            <Form.Check
              type="checkbox"
              name="recurring"
              label="Recurring weekly schedule"
              checked={options.recurring}
              onChange={handleOptionChange}
              className="mb-2"
            />
            <Form.Check
              type="checkbox"
              name="notifications"
              label="Send notifications to students"
              checked={options.notifications}
              onChange={handleOptionChange}
              className="mb-2"
            />
            <Form.Check
              type="checkbox"
              name="public"
              label="Make schedule public"
              checked={options.public}
              onChange={handleOptionChange}
            />
          </Form>
        </Card.Body>
      </Card>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Card.Title className="fs-5 fw-semibold mb-3">Upload Schedule File</Card.Title>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border border-2 border-dashed rounded p-5 text-center schedule-drop-zone"
            onClick={() => document.getElementById('fileInput').click()}
          >
            <p className="text-muted mb-1">Drop files here or click to browse</p>
            <p className="small text-muted">PDF, CSV, or Excel (Max 10MB)</p>
            <Form.Control
              id="fileInput"
              type="file"
              accept=".pdf,.csv,.xls,.xlsx"
              onChange={handleFileChange}
              className="d-none"
            />
          </div>
          {file && (
            <p className="mt-2 small text-muted">Selected: {file.name}</p>
          )}
          <div className="mt-3">
            <a href="#" className="small">schedule-template.pdf</a>
          </div>
        </Card.Body>
      </Card>


      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Card.Title className="fs-5 fw-semibold mb-3">Quick Actions</Card.Title>
          <div className="d-flex flex-wrap gap-3">
            <Button variant="light" className="border">Download Template</Button>
            <Button variant="light" className="border">View Recent Schedules</Button>
            <Button variant="light" className="border">Get Help</Button>
          </div>
        </Card.Body>
      </Card>

      {/* Action Buttons */}
      <div className="d-flex justify-content-end gap-3 mt-4">
        <Button variant="light" className="border">Cancel</Button>
        <Button variant="primary" onClick={handleSaveSchedule}>Save Schedule</Button>
      </div>
    </div>
  );
}

export default ScheduleScreen;
