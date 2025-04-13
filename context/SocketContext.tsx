'use client';

import baseUrl from '@/config/baseUrl';
import { useLoadUserQuery } from '@/redux/features/auth/authApi';
import { SocketUser } from '@/types';
import { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';

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
	useLoadUserQuery();
	const { user, token } = useSelector((state: any) => state.auth);
	const [socket, setSocket] = useState<Socket | null>(null);
	const [isSocketConnected, setIsSocketConnected] = useState(false);
	const [onlineUsers, setOnlineUsers] = useState<SocketUser[]>([]);

	useEffect(() => {
		console.log('SocketContextProvider user:', user);
		console.log('SocketContextProvider user token:', token);
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
	}, [user?.token]);

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

		socket.emit('addNewUser', user);

		const handleGetUsers = (res: SocketUser[]) => {
			setOnlineUsers(res);
		};

		socket.on('getUsers', handleGetUsers);

		return () => {
			socket.off('getUsers', handleGetUsers);
		};
	}, [socket, isSocketConnected, user]);

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
