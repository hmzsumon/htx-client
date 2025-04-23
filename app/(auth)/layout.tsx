'use client';
import AuthFooter from '@/components/layout/AuthFooter';
import AuthNavBar from '@/components/layout/AuthNavBar';
import { useLoadUserQuery } from '@/redux/features/auth/authApi';
import { TickerProvider } from '@/TickerContext';
import React from 'react';

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	useLoadUserQuery();
	return (
		<div className=''>
			<AuthNavBar />
			<div className='py-[0.09rem] min-h-screen '>
				<TickerProvider>{children}</TickerProvider>
			</div>
			<AuthFooter />
		</div>
	);
};

export default AuthLayout;
