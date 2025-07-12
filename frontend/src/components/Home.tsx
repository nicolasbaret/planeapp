import React from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const fetchHealth = async () => {
  const res = await api.get('/health');
  return res.data;
};

const Home: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['health'],
    queryFn: fetchHealth,
  });

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to PlaneApp!
      </Typography>
      {isLoading && <CircularProgress />}
      {error && (
        <Typography color="error">Error connecting to backend.</Typography>
      )}
      {data && (
        <Typography color="primary">Backend status: {data.status}</Typography>
      )}
    </Box>
  );
};

export default Home;
