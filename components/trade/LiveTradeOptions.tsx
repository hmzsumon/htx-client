'use client';

import React, { use, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '@/context/SocketContext';

import {
	useGetUpcomingLiveTradeQuery,
	usePlaceLiveTradeMutation,
} from '@/redux/features/trade/tradeApi';
import { useBalanceTransferToMainMutation } from '@/redux/features/send/sendApi';
import { formatBalance } from '@/lib/functions';
import { setLiveTradeDrawerOpen } from '@/redux/features/trade/tradeSlice';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { PulseLoader, RingLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import LiveTradeDrawer from './LiveTradeDrawer';
import LiveTradeBalance from './LiveTradeBalance';
import LiveTradeDonutChart from './LiveTradeBalance2';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import Link from 'next/link';
import { CirclePlus } from 'lucide-react';
import AddBalanceToLiveTradeDrawer from './AddBalanceToLiveTradeDrawer';

const LiveTradeOptions = () => {
	const dispatch = useDispatch();
	const { socket } = useSocket();
	const { user } = useSelector((state: any) => state.auth);

	const [isLiveAddBalanceDrawerOpen, setIsLiveAddBalanceDrawerOpen] =
		useState(false);

	const { data, isLoading, refetch } = useGetUpcomingLiveTradeQuery(undefined);
	const { liveTrade, alreadyJoined, me } = data || {};

	const [
		placeLiveTrade,
		{
			isLoading: isPlaceLoading,
			isSuccess: isPlaceSuccess,
			isError: isPlaceError,
			error: placeError,
		},
	] = usePlaceLiveTradeMutation();

	const [
		balanceTransferToMain,
		{
			isLoading: isTransferLoading,
			isSuccess: isTransferSuccess,
			isError: isTransferError,
			error: transferError,
		},
	] = useBalanceTransferToMainMutation();

	// Socket listen for live trade start
	useEffect(() => {
		if (!socket) return;
		const handleLiveTradeActivated = () => {
			refetch();
			toast.success('Live trade is now active!');
		};

		// Listen for the event when the new live trade created
		const handleNewLiveTrade = () => {
			refetch();
			toast.success('New live trade is created!');
		};

		// Listen for the event when the live trade ended
		const handleLiveTradeEnded = () => {
			refetch();
			toast.success('Live trade has ended!');
		};
		socket.on('live-trade-started', handleLiveTradeActivated);
		socket.on('new-live-trade', handleNewLiveTrade);
		socket.on('live-trade-ended', handleLiveTradeEnded);
		return () => {
			socket.off('live-trade-started', handleLiveTradeActivated);
			socket.off('new-live-trade', handleNewLiveTrade);
			socket.off('live-trade-ended', handleLiveTradeEnded);
		};
	}, [socket, refetch]);

	// Place Trade
	const handlePlaceLiveTrade = () => {
		placeLiveTrade({});
	};

	// Transfer to Main Balance
	const handleTransferToMainBalance = () => {
		balanceTransferToMain({});
	};

	// Toasts
	useEffect(() => {
		if (isPlaceSuccess) toast.success('Joined live trade successfully!');
		if (isPlaceError)
			toast.error(
				(placeError as fetchBaseQueryError)?.data?.message || 'Join failed'
			);
	}, [isPlaceSuccess, isPlaceError, placeError]);

	useEffect(() => {
		if (isTransferSuccess)
			toast.success('Balance transferred to main successfully!');
		if (isTransferError)
			toast.error(
				(transferError as fetchBaseQueryError)?.data?.message ||
					'Transfer failed'
			);
	}, [isTransferSuccess, isTransferError, transferError]);

	// 🔥 Dynamic UI Generator
	const renderLiveTradeUI = () => {
		if (isLoading || liveTrade?.status === 'completed') {
			return (
				<div className='flex flex-col gap-2 items-center justify-center py-10'>
					<RingLoader color='#000cff' size={70} />
					<h2 className='font-bold'>Loading Live Trade... ⏳</h2>
				</div>
			);
		}

		if (!liveTrade) {
			return (
				<div className='flex flex-col gap-2 items-center justify-center py-10'>
					<RingLoader color='#ff0000' size={70} />
					<h2 className='font-bold text-red-500'>No Live Trade Available 😞</h2>
				</div>
			);
		}

		if (liveTrade.status === 'upcoming') {
			if (user?.live_trade_balance === 0) {
				return (
					<Button
						onClick={() => dispatch(setLiveTradeDrawerOpen(true))}
						className='bg-green-500 text-white w-full'
						disabled={!user?.is_active}
					>
						Transfer to Live Trade 💰
					</Button>
				);
			} else {
				if (!alreadyJoined) {
					return (
						<Button
							onClick={handlePlaceLiveTrade}
							className='bg-htx-blue text-white w-full'
							disabled={isPlaceLoading}
						>
							{isPlaceLoading ? (
								<PulseLoader color='#fff' size={8} />
							) : (
								'Join to Live Trade 🚀'
							)}
						</Button>
					);
				} else {
					return (
						<p className='text-center text-green-600 font-semibold'>
							✅ Already joined
						</p>
					);
				}
			}
		}

		if (liveTrade.status === 'completed') {
			if (user?.is_live_trade) {
				return (
					<Button
						onClick={handleTransferToMainBalance}
						className='bg-orange-500 text-white w-full'
						disabled={isTransferLoading}
					>
						{isTransferLoading ? (
							<PulseLoader color='#fff' size={8} />
						) : (
							'Transfer to Main Balance 🏦'
						)}
					</Button>
				);
			}
		}

		if (liveTrade.status === 'active') {
			return (
				<div>
					{user?.is_live_trade && me?.isAddedButton && (
						<>
							<Button
								onClick={() => setIsLiveAddBalanceDrawerOpen(true)}
								className='bg-green-500 text-white w-full'
								disabled={
									user?.m_balance < user?.live_trade_balance / 2 ||
									!user?.is_active
								}
							>
								Add Fund to Live Trade ➕
							</Button>

							<p className='text-red-500 text-center border border-red-500 py-1 font-semibold text-[0.65rem] mt-2'>
								⚠️ Live Trade Alert Balance down 60%. Top up 50% to stay safe.
							</p>
						</>
					)}
					{!user?.is_live_trade && (
						<>
							<div className='flex flex-col gap-2 items-center justify-center py-10'>
								<div className='flex flex-col gap-2 items-center justify-center py-10'>
									<RingLoader color='#ff0000' size={70} />
								</div>
								<p className='text-center text-red-500 font-semibold'>
									⚠️ Live trade is active. New joining is closed.
								</p>
							</div>
						</>
					)}
				</div>
			);
		}

		return null;
	};

	return (
		<div className='px-1'>
			<Card className='p-2 rounded-md shadow-md space-y-4 mt-2'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-2'>
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

				{/* Balance Animation */}
				<div>
					{liveTrade?.is_active && alreadyJoined && <LiveTradeBalance />}
					{liveTrade?.is_upcoming && (
						<LiveTradeDonutChart
							initialBalance={user?.live_trade_balance || 0}
						/>
					)}
				</div>

				{/* Dynamic Buttons */}
				{renderLiveTradeUI()}

				{user?.live_trade_balance > 0 && liveTrade?.status === 'completed' && (
					<div>
						<p className=' text-xs font-bold text-green-500 border border-green-500 py-2 text-center my-1 rounded-md'>
							Your Today Live Trade Profit: {formatBalance(me?.profit)}$
						</p>
						<Button
							onClick={handleTransferToMainBalance}
							className='bg-orange-500 text-white w-full'
							disabled={isTransferLoading}
						>
							{isTransferLoading ? (
								<PulseLoader color='#fff' size={8} />
							) : (
								'Transfer Previous Balance 🌟'
							)}
						</Button>
					</div>
				)}
			</Card>

			{/* End Section */}
			<Card className='p-2 rounded-md shadow-md space-y-4 mt-2'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-2'>
						<h2 className='text-sm font-semibold'>Main Balance:</h2>
						<span>{formatBalance(user?.m_balance)}$</span>
						<Link href='/deposit'>
							<span>
								<CirclePlus
									size={18}
									className=' text-htx-blue cursor-pointer'
								/>
							</span>
						</Link>
					</div>
					<div className='flex items-center gap-2'>
						<h2 className='text-sm font-semibold'>Initial Balance:</h2>
						{liveTrade?.is_active ? (
							<span>{formatBalance(me?.initialBalance)}$</span>
						) : (
							<span>{formatBalance(user?.live_trade_balance)}$</span>
						)}
					</div>
				</div>
			</Card>

			<LiveTradeDrawer />
			<AddBalanceToLiveTradeDrawer
				isLiveAddBalanceDrawerOpen={isLiveAddBalanceDrawerOpen}
				setIsLiveAddBalanceDrawerOpen={setIsLiveAddBalanceDrawerOpen}
			/>
		</div>
	);
};

export default LiveTradeOptions;
