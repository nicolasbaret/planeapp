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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#222',
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{
          fontFamily: 'Press Start 2P, monospace',
          color: '#fff',
          textShadow: '2px 2px 0 #000, 4px 4px 0 #ff0',
          letterSpacing: 2,
          mb: 2,
        }}
      >
        PLANEAPP
      </Typography>
      {isLoading && <CircularProgress />}
      {error && (
        <Typography color="error">Error connecting to backend.</Typography>
      )}
      {data && (
        <Typography color="primary">Backend status: {data.status}</Typography>
      )}
      <Box mt={4}>
        <Typography
          variant="h6"
          sx={{ color: '#fff', fontFamily: 'monospace' }}
        >
          Game Demo:
        </Typography>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: 'auto',
          }}
        >
          <React.Suspense fallback={<CircularProgress />}>
            {/* Dynamically import GameCanvas for code splitting */}
            {React.createElement(
              React.lazy(() => import('../game/components/GameCanvas'))
            )}
          </React.Suspense>
        </div>
      </Box>
    </Box>
  );
};

export default Home;
