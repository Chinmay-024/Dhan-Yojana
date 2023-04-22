'use-client';
import { NoSsr } from '@mui/material';
import React from 'react';

const titleStyle = {
  fontSize: '2rem',
  marginBottom: '1rem',
  Color: 'white'
};

const textStyle = {
  fontSize: '1.5rem',
  Color: 'white'
};

const NotAuthenticated: React.FC = () => {
  return (
    <NoSsr>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: 'black',
          color: 'white'
        }}
      >
        <div>
          <h1 style={titleStyle}>You are not authorized</h1>
        </div>
        <div>
          <h2 style={textStyle}>Please login at Home Page</h2>
        </div>
      </div>
    </NoSsr>
  );
};

export default NotAuthenticated;
