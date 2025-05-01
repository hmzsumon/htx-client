'use client';
import {
	setTradeDrawerOpen,
	setPredict,
} from '@/redux/features/trade/tradeSlice';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const TradeButtons = () => {
	const pathname = usePathname();
	const lastSegment = pathname.split('/').pop();
	const dispatch = useDispatch();

	const { tradeDuration, currentRounds, symbol } = useSelector(
		(state: any) => state.trade
	);
	const activeRound = currentRounds?.[tradeDuration]?.[symbol];
	const endTime = activeRound?.endTime;

	const [disableButtons, setDisableButtons] = useState(false);

	useEffect(() => {
		if (!endTime) return;

		const interval = setInterval(() => {
			const now = new Date().getTime();
			const end = new Date(endTime).getTime();
			const diffInSec = Math.floor((end - now) / 1000);

			if (tradeDuration === '1m') {
				setDisableButtons(diffInSec <= 10); // 10s before end
			} else {
				setDisableButtons(diffInSec <= 30); // 30s before end
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [endTime, tradeDuration]);

	const handlePredict = (prediction: string) => {
		if (disableButtons) return;
		dispatch(setPredict(prediction));
		dispatch(setTradeDrawerOpen(true));
	};

	return (
		<div className='fixed bottom-0 left-0 right-0 bg-white px-2 text-xs font-bold py-4 shadow-lg z-50'>
			<div className='grid grid-cols-3 gap-1'>
				{['Up', 'Down', 'Sideways'].map((type) => (
					<button
						key={type}
						onClick={() => handlePredict(type)}
						className={`px-4 py-2 rounded-sm text-white ${
							type === 'Up'
								? 'bg-green-500 hover:bg-green-600'
								: type === 'Down'
								? 'bg-red-500 hover:bg-red-600'
								: 'bg-gray-500 hover:bg-gray-600'
						} ${disableButtons ? 'opacity-50 cursor-not-allowed' : ''}`}
						disabled={disableButtons}
					>
						{type}
					</button>
				))}
			</div>
		</div>
	);
};

export default TradeButtons;
