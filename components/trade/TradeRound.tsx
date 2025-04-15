'use client';
import toast from 'react-hot-toast';
import { useGetTradeRoundHistoryQuery } from '@/redux/features/trade/tradeApi';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RoundHistory from './RoundHistory';
import ActiveRound from './ActiveRound';
import socketIOClient from 'socket.io-client';
import baseUrl from '@/config/baseUrl';
import TradeDrawer from './TradeDrawer';
import { set } from 'react-hook-form';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';
import MyTradeHistory from './MyTradeHistory';
import { useSocket } from '@/context/SocketContext';
import { useLoadUserQuery } from '@/redux/features/auth/authApi';
import { formatBalance } from '@/lib/functions';
import { setCurrentRound } from '@/redux/features/trade/tradeSlice';

const TradeRound = () => {
	const dispatch = useDispatch();

	const { refetch: userRefetch } = useLoadUserQuery();
	const { symbol } = useSelector((state: any) => state.trade);
	const { data, isLoading, isError, isSuccess, error, refetch } =
		useGetTradeRoundHistoryQuery(undefined, {
			refetchOnFocus: true,
			refetchOnReconnect: true,
		});
	const { rounds } = data || [];

	const { socket } = useSocket();

	const { user } = useSelector((state: any) => state.auth); // Assuming you have a Redux store set up
	const [round, setRound] = useState(null);
	const [open, setOpen] = useState(false);

	const [activeHistory, setActiveHistory] = useState<any>(1);

	// useEffect(() => {
	// 	console.log('🧪 socket connected?', socket?.connected);
	// 	console.log('🧪 socket instance:', socket);
	// }, [socket]);

	useEffect(() => {
		if (!socket) return;

		const handleNewRound = (data: any[]) => {
			const filteredData = data.filter((item: any) => item.symbol === symbol);
			setRound(filteredData[0]);
			dispatch(setCurrentRound(filteredData[0]));
			refetch(); // round history re-fetch
		};

		const handleTradeResult = (data: any) => {
			// console.log('🎯 Trade result:', data);
			toast.success(`🔥 ${data.result} | +${data.profit} USDT`);
			userRefetch(); // ✅ Reload user balance
		};

		socket.on('new-round', handleNewRound);
		socket.on('trade-result', handleTradeResult);

		// Clean up on unmount or symbol/socket change
		return () => {
			socket.off('new-round', handleNewRound);
			socket.off('trade-result', handleTradeResult);
		};
	}, [socket, symbol, refetch, userRefetch]);

	// Prediction submit
	const handlePredict = async (prediction: string) => {
		setOpen(true);
	};

	// active history handler
	const handleActiveHistory = (id: number) => {
		setActiveHistory(id);
	};

	return (
		<div className='w-full mx-auto px-1 py-2'>
			<div className='bg-white shadow px-1 py-2 rounded'>
				<div>
					<h2 className='text-xs font-semibold mb-1  text-center'>
						Balance: {formatBalance(user?.m_balance) || 0} USDT
					</h2>
				</div>
				<ActiveRound activeRound={round} />
				<div className='flex items-center justify-between px-2 text-xs font-bold py-2 bg-gray-200 mt-2 '>
					<div className='flex items-center gap-2 text-gray-700'>
						<button
							onClick={() => handleActiveHistory(1)}
							className={`${
								activeHistory === 1 ? 'text-green-500 font-bold' : ''
							} text-xs`}
						>
							Trade Records
						</button>
						<button
							onClick={() => handleActiveHistory(2)}
							className={`${
								activeHistory === 2 ? 'text-green-500 font-bold' : ''
							} text-xs`}
						>
							My Trades
						</button>
					</div>
					<div className='flex items-center gap-1'>
						<span>More</span>
						<span>
							<ChevronRight size={18} />
						</span>
					</div>
				</div>
				{/* Trade Records and My Trades Section */}
				{activeHistory === 1 ? (
					<div className=''>
						<RoundHistory records={rounds} />
					</div>
				) : (
					<div className=' '>
						<MyTradeHistory />
					</div>
				)}

				<TradeDrawer />
			</div>
		</div>
	);
};

export default TradeRound;
