'use client';
import {
	setTradeDrawerOpen,
	setPredict,
} from '@/redux/features/trade/tradeSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const TradeButtons = () => {
	const dispatch = useDispatch();
	const handlePredict = (prediction: string) => {
		// Handle the prediction logic here
		dispatch(setPredict(prediction)); // Update the Redux state with the prediction
		console.log(`Predicted: ${prediction}`);
		dispatch(setTradeDrawerOpen(true)); // Open the trade drawer
	};
	return (
		<div className='fixed bottom-0 left-0 right-0 bg-white px-2 text-xs font-bold py-4 shadow-lg z-50'>
			<div className='grid grid-cols-3 gap-1'>
				<button
					onClick={() => handlePredict('Up')}
					className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-sm'
				>
					Up
				</button>
				<button
					onClick={() => handlePredict('Down')}
					className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-sm'
				>
					Down
				</button>
				<button
					onClick={() => handlePredict('Sideways')}
					className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-sm'
				>
					Sideways
				</button>
			</div>
		</div>
	);
};

export default TradeButtons;
