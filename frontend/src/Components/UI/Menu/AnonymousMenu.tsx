import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const AnonymousMenu = () => {
	return (
		<>
			<Button
				color="inherit"
				component={Link}
				to="/register"
				sx={{ fontSize: '16px', fontWeight: 'bold' }}
			>
				Sign up
			</Button>
			<Button
				color="inherit"
				component={Link}
				to="/login"
				sx={{ fontSize: '16px', fontWeight: 'bold' }}
			>
				Sign in
			</Button>
		</>
	);
};

export default AnonymousMenu;
