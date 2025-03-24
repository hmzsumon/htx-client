import RegisterPage from '@/components/register/RegisterPage';
import React from 'react';

const Register = () => {
	return (
		<div
			className='flex flex-col items-center justify-center px-2'
			// style={{ height: 'calc(100vh - 20px)' }}
		>
			<div className='mt-10'>
				<RegisterPage />
			</div>
		</div>
	);
};

export default Register;
