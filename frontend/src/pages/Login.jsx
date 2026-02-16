import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import useAuth from '../hooks/useAuth';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
} from '@mui/material';

export default function Login() {
  const { user, loginUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard
  if (user) return <Navigate to="/dashboard" />;

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axiosInstance.post('/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem(
        'user',
        JSON.stringify({
          full_name: res.data.full_name,
          email: res.data.email,
          role: res.data.role,
          subscription_type: res.data.subscription_type,
        })
      );
      loginUser({
        full_name: res.data.full_name,
        email: res.data.email,
        role: res.data.role,
        subscription_type: res.data.subscription_type,
      });
      navigate('/dashboard');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 8,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
      component={Paper}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          fullWidth
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ mt: 1 }}
        >
          Login
        </Button>
      </Box>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don't have an account? <Link to="/register">Register here</Link>.
      </Typography>
    </Box>
  );
}
