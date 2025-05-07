'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from '@/public/images/logos/icon-htx.png';
import Link from 'next/link';
import { BellDot, Menu } from 'lucide-react';
import { UserDropdownMenu } from '../UserDropdownMenu';
import { useGetNotificationCountQuery } from '@/redux/features/notifications/notificationApi';
import { useSocket } from '@/context/SocketContext';
import { useSelector } from 'react-redux';

export const LogoText = () => {
	const router = useRouter();
	return (
		<div className='flex items-center gap-1'>
			<Image
				src={Logo}
				alt='logo'
				className='w-4'
				onClick={() => router.push('/')}
			/>
			<h2 className='text-htx-blue text-md flex items-center gap-1 cursor-pointer'>
				<span className='text-htx-blue font-bold '>HTX</span>
				<span className='text-slate-600 font-bold '>Trade</span>
			</h2>
		</div>
	);
};

const AuthNavBar = () => {
	const router = useRouter();
	const { socket } = useSocket();
	const { user } = useSelector((state: any) => state.auth);
	const { data, refetch } = useGetNotificationCountQuery(undefined);
	const { notifications } = data || {};
	const [count, setCount] = useState(notifications);

	// 🟢 update count when notifications data changes
	useEffect(() => {
		if (notifications !== undefined) {
			setCount(notifications);
		}
	}, [notifications]);

	// Socket listen for live trade start
	useEffect(() => {
		if (!socket) return;
		const handleRefetch = (data: any) => {
			if (data?.user_id === user?._id) {
				refetch();
			}
		};

		socket.on('user-notification', handleRefetch);

		return () => {
			socket.off('user-notification', handleRefetch);
		};
	}, [socket, refetch]);

	return (
		<div className='heder-bg sticky top-0 border-b border-b-primary/10 header z-50 bg-[#C0F2DC] shadow-sm'>
			<div className='max-w-[1920px] w-full mx-auto xl:px-20 px-2 py-3'>
				<div className='flex justify-between items-center'>
					<div className=' flex items-center gap-1 cursor-pointer'>
						<LogoText />
					</div>

					<div className=' flex items-center gap-3'>
						<div className='flex gap-2'>
							<Link href='/notifications' className='relative'>
								<BellDot className='text-htx-blue' />
								{count > 0 && (
									<span
										className={`bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center p-1 absolute -top-2 -right-2 cursor-pointer ${
											count > 99 ? 'text-[.6rem]' : 'text-[.7rem]'
										}`}
									>
										{count > 99 ? '99+' : count}
									</span>
								)}
							</Link>

							{/* UserDropdownMenu */}
							<UserDropdownMenu />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthNavBar;
