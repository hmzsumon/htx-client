'use client';
import AuthFooter from '@/components/layout/AuthFooter';
import AuthNavBar from '@/components/layout/AuthNavBar';
import TradeButtons from '@/components/trade/TradeButtons';
import TradeHeader from '@/components/trade/TradeHeader';
import { TickerProvider } from '@/TickerContext';
import React, { useState } from 'react';

const TradeLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	const [open, setOpen] = useState(false);
	return (
		<div className=''>
			<TradeHeader setOpen={setOpen} open={open} />
			<div className='py-[0.09rem] min-h-screen mt-24 '>
				<TickerProvider>{children}</TickerProvider>
			</div>
			<TradeButtons />
		</div>
	);
};

export default TradeLayout;
