'use client';

import baseUrl from '@/config/baseUrl';
import { useLoadUserQuery } from '@/redux/features/auth/authApi';
import { SocketUser } from '@/types';
import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import { setCurrentRoundByTimeAndSymbol } from '@/redux/features/trade/tradeSlice';
import {
	useGetMyTradeRoundHistoryQuery,
	useGetTradeRoundHistoryBySymbolQuery,
} from '@/redux/features/trade/tradeApi';
import toast from 'react-hot-toast';

interface iSocketContextType {
	socket: Socket | null;
	isSocketConnected: boolean;
	onlineUsers: SocketUser[];
}

export const SocketContext = createContext<iSocketContextType | null>(null);

export const SocketContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { refetch: userRefetch } = useLoadUserQuery();
	const { symbol, tradeDuration } = useSelector((state: any) => state.trade);
	const { refetch: historyRefetch } = useGetTradeRoundHistoryBySymbolQuery({
		symbol,
		timePeriod: tradeDuration,
		page: 1, // optional, default = 1
		limit: 10, // optional, default = 10
	});
	const { refetch: myHistoryRefetch } =
		useGetMyTradeRoundHistoryQuery(undefined);

	const dispatch = useDispatch();
	const { user, token } = useSelector((state: any) => state.auth);
	const [socket, setSocket] = useState<Socket | null>(null);
	const [isSocketConnected, setIsSocketConnected] = useState(false);
	const [onlineUsers, setOnlineUsers] = useState<SocketUser[]>([]);

	useEffect(() => {
		if (!token) return;

		const newSocket = io(baseUrl, {
			transports: ['websocket'],
			auth: { token: user.token },
		});

		newSocket.on('connect', () => {
			console.log('✅ Socket connected:', newSocket.id);
			newSocket.emit('authenticate', token);
		});

		setSocket(newSocket);

		return () => {
			newSocket.off();
			newSocket.disconnect();
		};
	}, [token]);

	useEffect(() => {
		if (!socket) return;

		const onConnect = () => setIsSocketConnected(true);
		const onDisconnect = () => setIsSocketConnected(false);

		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);

		return () => {
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisconnect);
		};
	}, [socket]);

	useEffect(() => {
		if (!socket || !isSocketConnected || !user) return;

		const handleGetUsers = (res: SocketUser[]) => {
			setOnlineUsers(res);
		};

		const handleNewRound = (rounds: any[]) => {
			historyRefetch();
			rounds.forEach((round: any) => {
				dispatch(
					setCurrentRoundByTimeAndSymbol({
						timePeriod: round.timePeriod,
						symbol: round.symbol,
						round,
					})
				);
			});
		};

		const handleResult = (result: any) => {
			console.log('Trade result:', result);
			if (result.status === 'Succeed') {
				toast.success(`Trade result: ${result.status}`);
			} else if (result.status === 'Equal') {
				toast(`😐 Trade result: ${result.status}`, { icon: '🤝' });
			} else {
				toast.error(`Trade result: ${result.status}`);
			}

			// ✅ Inject fake candle if manipulation happened
			if (result.isManipulated && result.finalCandle) {
				window.dispatchEvent(
					new CustomEvent('inject-candle', {
						detail: result.finalCandle,
					})
				);

				console.log('Fake candle injected:', result.finalCandle);
			}
			userRefetch();
			myHistoryRefetch();
		};

		// Clean previous listeners before setting new ones
		socket.off('getUsers').on('getUsers', handleGetUsers);
		socket.off('new-round').on('new-round', handleNewRound);
		socket.off('trade-result').on('trade-result', handleResult);

		return () => {
			socket.off('getUsers');
			socket.off('new-round');
			socket.off('trade-result');
		};
	}, [socket, isSocketConnected, user, symbol, tradeDuration]);

	return (
		<SocketContext.Provider value={{ socket, isSocketConnected, onlineUsers }}>
			{children}
		</SocketContext.Provider>
	);
};

export const useSocket = () => {
	const context = useContext(SocketContext);
	if (!context) {
		throw new Error('useSocket must be used within a SocketProvider');
	}
	return context;
};
