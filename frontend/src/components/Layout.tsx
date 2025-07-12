import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';

const Layout: React.FC = () => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          PlaneApp
        </Typography>
      </Toolbar>
    </AppBar>
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Outlet />
    </Container>
  </>
);

export default Layout;
