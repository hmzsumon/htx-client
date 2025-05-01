import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PulseLoader from 'react-spinners/PulseLoader';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import { Card } from '../ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { formatBalance } from '@/lib/functions';
import { setLiveTradeDrawerOpen } from '@/redux/features/trade/tradeSlice';
import LiveTradeDrawer from './LiveTradeDrawer';
import {
	useGetUpcomingLiveTradeQuery,
	usePlaceLiveTradeMutation,
} from '@/redux/features/trade/tradeApi';
import LiveTradeBalance from './LiveTradeBalance';
import LiveTradeDonutChart from './LiveTradeBalance2';
import { Button } from '../ui/button';
import { useSocket } from '@/context/SocketContext';
import { useBalanceTransferToMainMutation } from '@/redux/features/send/sendApi';
import { RingLoader } from 'react-spinners';
import { useLoadUserQuery } from '@/redux/features/auth/authApi';

const LiveTradeOptions = () => {
	useLoadUserQuery();
	const { socket } = useSocket(); // ✅ socket access
	const { data, isLoading, isError, error, refetch } =
		useGetUpcomingLiveTradeQuery(undefined);
	const { liveTrade, alreadyJoined } = data || {};

	const dispatch = useDispatch();
	const { user } = useSelector((state: any) => state.auth);

	// receive live trade data from socket
	useEffect(() => {
		if (!socket) return;

		// ✅ Event listener
		const handleLiveTradeActivated = (payload: any) => {
			console.log('📢 Live Trade Activated:', payload);

			// ✅ Reload live trade data
			refetch();

			// ✅ Optionally Toast
			toast.success('Live trade is now active!');
		};

		// ✅ Listen to event
		socket.on('live-trade-started', handleLiveTradeActivated);

		// ✅ Cleanup listener on unmount
		return () => {
			socket.off('live-trade-started', handleLiveTradeActivated);
		};
	}, [socket, refetch]);

	const [
		placeLiveTrade,
		{
			isLoading: isPlaceLoading,
			isError: isPlaceError,
			isSuccess: isPlaceSuccess,
			error: placeError,
		},
	] = usePlaceLiveTradeMutation();

	// handle place live trade
	const handlePlaceLiveTrade = () => {
		placeLiveTrade({});
	};

	useEffect(() => {
		if (isPlaceSuccess) {
			toast.success('Live trade started successfully');
		}
		if (isPlaceError) {
			toast.error(
				(placeError as fetchBaseQueryError).data?.message ||
					'Something went wrong'
			);
		}
	}, [isPlaceSuccess, isPlaceError, placeError]);

	// call transfer to main balance api
	const [
		balanceTransferToMain,
		{
			isLoading: isTransferLoading,
			isError: isTransferError,
			isSuccess: isTransferSuccess,
			error: transferError,
		},
	] = useBalanceTransferToMainMutation();

	// handle transfer to main balance
	const handleTransferToMainBalance = () => {
		balanceTransferToMain({});
	};

	useEffect(() => {
		if (isTransferSuccess) {
			toast.success(
				'Live trade balance transferred to main balance successfully'
			);
		}
		if (isTransferError) {
			toast.error(
				(transferError as fetchBaseQueryError).data?.message ||
					'Something went wrong'
			);
		}
	}, [isTransferSuccess, isTransferError, transferError]);

	return (
		<div className='px-1'>
			{/* Start Live trade */}
			{user?.live_trade_balance > 0 && (
				<Card className='p-2 rounded-md shadow-md space-y-4 mt-2'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center justify-between gap-2'>
							<h2 className='text-sm font-semibold'>Symbol :</h2>
							<span className='text-sm font-semibold'>
								{liveTrade?.symbol || 'BTC/USDT'}
							</span>
						</div>
						<div className='flex items-center gap-2'>
							<h2 className='text-sm font-semibold'>Status :</h2>
							<span>
								{liveTrade?.status === 'active'
									? 'Active'
									: liveTrade?.status === 'completed'
									? 'Completed'
									: 'Upcoming'}
							</span>
						</div>
					</div>

					{/* User live trade Display with animation */}
					<div>
						{liveTrade?.is_active && (
							<LiveTradeBalance
								initialBalance={user?.live_trade_balance || 0}
							/>
						)}
						{liveTrade?.is_upcoming && (
							<LiveTradeDonutChart
								initialBalance={user?.live_trade_balance || 0}
							/>
						)}
					</div>

					{/* Start live trade button */}
					{!alreadyJoined && user?.is_live_trade_claim && (
						<button
							onClick={handlePlaceLiveTrade}
							disabled={isPlaceLoading}
							className='bg-htx-blue text-sm font-semibold w-full hover:bg-blue-700 text-white px-4 py-2 rounded-sm'
						>
							{isPlaceLoading ? (
								<PulseLoader color='#fff' size={8} />
							) : (
								'Join to Live Trade 🚀'
							)}
						</button>
					)}

					{!user?.is_live_trade && liveTrade?.status === 'completed' && (
						<button
							onClick={handleTransferToMainBalance}
							disabled={isTransferLoading}
							className='bg-orange-400 text-sm font-semibold w-full hover:bg-orange-500 text-white px-4 py-2 rounded-sm'
						>
							{isTransferLoading ? (
								<PulseLoader color='#fff' size={8} />
							) : (
								'Transfer To Main Balance 🌹'
							)}
						</button>
					)}
				</Card>
			)}

			{/* End Live trade */}
			{!liveTrade?.is_upcoming ? (
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

					{user?.is_live_trade ? (
						<div>
							<Button
								onClick={() => dispatch(setLiveTradeDrawerOpen(true))}
								className='bg-green-500 text-sm font-semibold w-full hover:bg-green-600 text-white px-4 py-2 rounded-sm'
								disabled={
									isLoading ||
									isPlaceLoading ||
									!user?.is_active ||
									user?.m_balance <= user?.live_trade_balance / 2
								}
							>
								Add Fund to Live Trade
							</Button>

							{user?.m_balance <= user?.live_trade_balance / 2 && (
								<p className='text-red-500 font-semibold text-[0.70rem] text-center'>
									⚠️ Not enough balance. Top up at least 50% of your initial
									transfer to continue.
								</p>
							)}
						</div>
					) : (
						<Button
							onClick={() => dispatch(setLiveTradeDrawerOpen(true))}
							className='bg-green-500 text-sm font-semibold w-full hover:bg-green-600 text-white px-4 py-2 rounded-sm'
							disabled={isLoading || isPlaceLoading || !user?.is_active}
						>
							Transfer To Live Trade
						</Button>
					)}
				</Card>
			) : (
				<Card className='p-2 rounded-md shadow-md space-y-4 mt-4'>
					<div className='flex flex-col gap-2 items-center justify-center'>
						<RingLoader color='#000cff' size={70} />
						<h2 className=' font-bold'>Waiting for live trade to start... </h2>
					</div>
				</Card>
			)}

			<LiveTradeDrawer />
		</div>
	);
};

export default LiveTradeOptions;
