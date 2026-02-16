import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from '@mui/material';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newSchedule, setNewSchedule] = useState({
    building_name: '',
    day_of_week: '',
    start_time: '',
    end_time: '',
  });
  const [creatingSchedule, setCreatingSchedule] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token || !storedUser) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(storedUser));

    axiosInstance
      .get('/dashboard')
      .then(res => {
        setDashboardData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load dashboard data');
        localStorage.clear();
        navigate('/login');
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleScheduleChange = e => {
    setNewSchedule({ ...newSchedule, [e.target.name]: e.target.value });
  };

  const handleScheduleSubmit = async e => {
    e.preventDefault();
    setCreatingSchedule(true);
    setError(null);
    try {
      await axiosInstance.post('/schedules', newSchedule);
      const res = await axiosInstance.get('/dashboard');
      setDashboardData(res.data);
      setNewSchedule({
        building_name: '',
        day_of_week: '',
        start_time: '',
        end_time: '',
      });
    } catch {
      setError('Failed to create schedule');
    } finally {
      setCreatingSchedule(false);
    }
  };

  if (loading)
    return (
      <Box sx={{ textAlign: 'center', marginTop: 10 }}>
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Loading Dashboard...
        </Typography>
      </Box>
    );

  if (error)
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', mt: 4, px: 2 }}>
      {/* Header with logout */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Welcome, {user.full_name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Role: {user.role}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Subscription: {user.subscription_type}
          </Typography>
        </Box>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {/* Schedules Section */}
      <Box mt={5}>
        <Typography variant="h5" gutterBottom>
          Schedules
        </Typography>

        {dashboardData.schedules.length === 0 ? (
          <Typography>No schedules available.</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table size="small" aria-label="Schedules table">
              <TableHead>
                <TableRow>
                  <TableCell>Building</TableCell>
                  <TableCell>Day of Week</TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell>End Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dashboardData.schedules.map(schedule => (
                  <TableRow key={schedule.schedule_id || schedule.id}>
                    <TableCell>{schedule.building_name}</TableCell>
                    <TableCell>{schedule.day_of_week}</TableCell>
                    <TableCell>{schedule.start_time}</TableCell>
                    <TableCell>{schedule.end_time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Typography variant="h6" gutterBottom>
          Add New Schedule
        </Typography>
        <Box component="form" onSubmit={handleScheduleSubmit} sx={{ maxWidth: 400 }}>
          <TextField
            label="Building Name"
            name="building_name"
            value={newSchedule.building_name}
            onChange={handleScheduleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Day of Week"
            name="day_of_week"
            value={newSchedule.day_of_week}
            onChange={handleScheduleChange}
            placeholder="e.g. Monday"
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Start Time"
            name="start_time"
            type="time"
            value={newSchedule.start_time}
            onChange={handleScheduleChange}
            required
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="End Time"
            name="end_time"
            type="time"
            value={newSchedule.end_time}
            onChange={handleScheduleChange}
            required
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="contained" type="submit" disabled={creatingSchedule} sx={{ mt: 2 }}>
            {creatingSchedule ? 'Creating...' : 'Create Schedule'}
          </Button>
        </Box>
      </Box>

      {/* Parking Buildings & Slots */}
      <Box mt={6}>
        <Typography variant="h5" gutterBottom>
          Parking Buildings & Slots
        </Typography>
        {dashboardData.parkingBuildings.length === 0 ? (
          <Typography>No parking buildings available.</Typography>
        ) : (
          dashboardData.parkingBuildings.map(building => (
            <Card key={building.building_id || building.id} sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6">
                  {building.building_name || building.name}
                </Typography>
                <Typography>
                  Total Slots:{' '}
                  {building.total_slotbigints ||
                    building.total_slotbigtints ||
                    building.total_slotbignst ||
                    building.total_slotbigints}
                </Typography>
                <Typography variant="subtitle1" mt={1}>
                  Slots:
                </Typography>
                <ul>
                  {(dashboardData.parkingSlots || [])
                    .filter(
                      slot =>
                        slot.building_id === building.building_id ||
                        slot.building_id === building.id,
                    )
                    .map(slot => (
                      <li key={slot.slot_id || slot.id}>
                        {slot.slot_code || slot.slot_number || slot.slot_code}
                      </li>
                    ))}
                </ul>
              </CardContent>
            </Card>
          ))
        )}
      </Box>

      {/* Parking Assignments */}
      <Box mt={6}>
        <Typography variant="h5" gutterBottom>
          Parking Assignments
        </Typography>
        {dashboardData.assignments.length === 0 ? (
          <Typography>No parking assignments.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table size="small" aria-label="Parking assignments table">
              <TableHead>
                <TableRow>
                  <TableCell>Assignment ID</TableCell>
                  <TableCell>User ID</TableCell>
                  <TableCell>Slot ID</TableCell>
                  <TableCell>Assignment Date</TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell>End Time</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dashboardData.assignments.map(a => (
                  <TableRow key={a.assignment_id || a.id}>
                    <TableCell>{a.assignment_id || a.id}</TableCell>
                    <TableCell>{a.user_id}</TableCell>
                    <TableCell>{a.slot_id}</TableCell>
                    <TableCell>{a.assignment_date}</TableCell>
                    <TableCell>{a.start_time}</TableCell>
                    <TableCell>{a.end_time}</TableCell>
                    <TableCell>{a.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* AI Logs */}
      <Box mt={6} mb={6}>
        <Typography variant="h5" gutterBottom>
          AI Logs
        </Typography>
        {dashboardData.aiLogs.length === 0 ? (
          <Typography>No AI logs.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table size="small" aria-label="AI logs table">
              <TableHead>
                <TableRow>
                  <TableCell>Log ID</TableCell>
                  <TableCell>User ID</TableCell>
                  <TableCell>Decision Summary</TableCell>
                  <TableCell>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dashboardData.aiLogs.map(log => (
                  <TableRow key={log.log_id || log.id}>
                    <TableCell>{log.log_id || log.id}</TableCell>
                    <TableCell>{log.user_id}</TableCell>
                    <TableCell>{log.decision_summary || log.event || ''}</TableCell>
                    <TableCell>{new Date(log.created_at).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
}
