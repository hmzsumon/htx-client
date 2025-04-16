import {
	setKline,
	setTradeDuration,
	setTradeLoading,
} from '@/redux/features/trade/tradeSlice';
import React, { useState } from 'react';
import { AiOutlineLineChart } from 'react-icons/ai';
import { MdCandlestickChart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

const TradeDuration = () => {
	const dispatch = useDispatch();
	const { tradeDuration, kline } = useSelector((state: any) => state.trade);

	// handle kline change
	const handleKlineChange = () => {
		// Set loading state to true
		dispatch(setKline());
		dispatch(setTradeLoading(true)); // Set loading state to true
	};

	// handle set time
	const handleSetTime = (e: any) => {
		dispatch(setTradeDuration(e)); // Close the trade drawer
		dispatch(setTradeLoading(true)); // Set loading state to true
	};
	return (
		<div className=''>
			<div className='flex items-center justify-around p-1 text-xs list-none text-blue-gray-300 bg-blue-gray-900 md:text-md bg-slate-300'>
				<li
					className={`cursor-pointer ${
						tradeDuration === '1m' ? 'text-green-500 font-bold' : ''
					}`}
					onClick={() => handleSetTime('1m')}
				>
					1m
				</li>
				<li
					className={`cursor-pointer ${
						tradeDuration === '3m' ? 'text-green-500 font-bold' : ''
					}`}
					onClick={() => handleSetTime('3m')}
				>
					3m
				</li>
				<li
					className={`
								cursor-pointer ${tradeDuration === '5m' ? 'text-green-500 font-bold' : ''}
							`}
					onClick={() => handleSetTime('5m')}
				>
					5m
				</li>
				<li
					className={`
								cursor-pointer ${tradeDuration === '15m' ? 'text-green-500 font-bold' : ''}
							`}
					onClick={() => handleSetTime('15m')}
				>
					15m
				</li>
				<li
					className={`
								cursor-pointer ${tradeDuration === '30m' ? 'text-green-500 font-bold' : ''}
							`}
					onClick={() => handleSetTime('30m')}
				>
					30m
				</li>
				<li
					className='text-yellow-700 cursor-pointer text-md'
					onClick={handleKlineChange}
				>
					{!kline ? <AiOutlineLineChart /> : <MdCandlestickChart />}
				</li>
			</div>
		</div>
	);
};

export default TradeDuration;
