'use client';
import React from 'react';
import { CircularProgress, Typography } from '@mui/material';

const Loading: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5'
      }}
    >
      <CircularProgress size={60} thickness={4} color="primary" />
      <Typography variant="h5" color="textPrimary" style={{ marginTop: 20 }}>
        Loading...
      </Typography>
    </div>
  );
};

export default Loading;
