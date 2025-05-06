'use client';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import PulseLoader from 'react-spinners/PulseLoader';
import {
	useDeleteNotificationMutation,
	useGetNotificationsQuery,
} from '@/redux/features/notifications/notificationApi';
import Image from 'next/image';

import ImgNodata from '@/public/images/no-data.gif';
import { Card } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import { formDateWithTime } from '@/lib/functions';

const Notifications = () => {
	const { data, isLoading } = useGetNotificationsQuery();
	const { notifications } = data || [];
	const [
		deleteNotification,
		{ isLoading: isDeleting, isSuccess, isError, error },
	] = useDeleteNotificationMutation();

	// handle delete notification
	const handleDeleteNotification = (id: string) => {
		deleteNotification(id);
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success('Notification deleted successfully');
		}
		if (isError) {
			toast.error((error as fetchBaseQueryError).data?.message);
		}
	}, [isSuccess, isError, error]);

	return (
		<div className='min-h-[80vh] h-full'>
			{notifications?.length > 0 ? (
				<div className='w-full space-y-1 px-1'>
					{notifications?.map((notification: any) => (
						<Card key={notification._id} className='w-full'>
							<div
								key={notification._id}
								className='p-2 w-full bg-white shadow-md rounded-md flex items-center justify-between '
							>
								<div className='space-y-1'>
									<h3 className='text-sm font-semibold '>
										{notification.title}
									</h3>
									<div className='text-xs space-y-1 font-semibold'>
										<p className='text-gray-600'>{notification.message}</p>
										<p className='text-xs text-gray-500'>
											{formDateWithTime(notification.createdAt)}
										</p>
									</div>
								</div>
								<div>
									<Trash2
										size={20}
										className='text-red-500 cursor-pointer '
										onClick={() => handleDeleteNotification(notification._id)}
									/>
								</div>
							</div>
						</Card>
					))}
				</div>
			) : (
				<div className=' flex items-center justify-center flex-col space-y-2 h-[80vh]'>
					<Image
						src={ImgNodata}
						alt='No data'
						width={150}
						height={150}
						className=' rounded-md'
					/>
					<p className='text-sm text-gray-500 text-center'>No data available</p>
				</div>
			)}
		</div>
	);
};

export default Notifications;
