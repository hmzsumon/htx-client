'use client';
import React, { use } from 'react';
import { Card } from '../ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { formatBalance } from '@/lib/functions';
import { setLiveTradeDrawerOpen } from '@/redux/features/trade/tradeSlice';
import LiveTradeDrawer from './LiveTradeDrawer';

const LiveTradeOptions = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state: any) => state.auth);
	return (
		<div className='px-1'>
			<Card className='p-2 rounded-md shadow-md space-y-4 mt-2'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center justify-between gap-2'>
						<h2 className='text-sm font-semibold'>Main Balance:</h2>
						<span>{formatBalance(user?.m_balance)}$</span>
					</div>
					<div className='flex items-center gap-2'>
						<h2 className='text-sm font-semibold'>Trade Balance:</h2>
						<span>{formatBalance(user?.live_trade_balance)}$</span>
					</div>
				</div>

				<button
					onClick={() => dispatch(setLiveTradeDrawerOpen(true))}
					className='bg-green-500 text-sm font-semibold w-full hover:bg-green-600 text-white px-4 py-2 rounded-sm'
				>
					Transfer To Live Trade
				</button>
			</Card>
			<LiveTradeDrawer />
		</div>
	);
};

export default LiveTradeOptions;
