import AuthFooter from '@/components/layout/AuthFooter';
import AuthNavBar from '@/components/layout/AuthNavBar';
import { TickerProvider } from '@/TickerContext';
import React from 'react';

const TradeLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<div className=''>
			<div className='py-[0.09rem] min-h-screen '>
				<TickerProvider>{children}</TickerProvider>
			</div>
		</div>
	);
};

export default TradeLayout;
