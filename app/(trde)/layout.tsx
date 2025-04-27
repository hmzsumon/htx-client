'use client';

import TradeButtons from '@/components/trade/TradeButtons';
import TradeHeader from '@/components/trade/TradeHeader';
import { TickerProvider } from '@/TickerContext';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import LiveTradeOptions from '@/components/trade/LiveTradeOptions';

const TradeLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	const pathname = usePathname(); // e.g. "/trade/all-trade-history"
	const lastSegment = pathname.split('/').pop(); // "all-trade-history"
	const isLiveTrade = lastSegment === 'live-trade' || lastSegment === 'trade'; // true or false

	const [open, setOpen] = useState(false);

	// conditionally hide header/buttons if on this route
	const hideHeaderFooter = lastSegment === 'all-trade-history';

	return (
		<div className=''>
			{!hideHeaderFooter && <TradeHeader setOpen={setOpen} open={open} />}

			<div className={`py-[0.09rem]  ${hideHeaderFooter ? 'mt-0' : 'mt-24'}`}>
				<TickerProvider>{children}</TickerProvider>
			</div>
			{isLiveTrade ? (
				<LiveTradeOptions />
			) : (
				<>{!hideHeaderFooter && <TradeButtons />}</>
			)}
		</div>
	);
};

export default TradeLayout;
