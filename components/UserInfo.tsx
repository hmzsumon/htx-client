'use client';
import React from 'react';
import Image from 'next/image';
import ProfileImg from '@/public/images/profile-avatar/avatar_1.png';
import { maskEmail } from '@/lib/functions';
import { useSelector } from 'react-redux';
import CopyToClipboard from '@/lib/CopyToClipboard';

const UserInfo = () => {
	const { user } = useSelector((state: any) => state.auth);
	return (
		<div className='flex items-center gap-6 text-white'>
			<div className='flex flex-col items-center gap-2 mt-4'>
				<Image
					src={ProfileImg}
					alt='profile'
					className=' w-20 h-20 rounded-full object-cover'
				/>
				<div className='text-center bg-green-500 text-white p-1 text-xs font-bold rounded-md'>
					<h2>TradeX</h2>
				</div>
			</div>
			<div className='mt-4 list-none space-y-1'>
				<h2 className='text-red-500 text-gradient text-sm font-bold'>
					{user?.name}
				</h2>

				<li className='grid grid-cols-12 gap-2 items-center'>
					<span className='text-xs font-bold col-span-5'>Email</span>
					<span className='font-bold col-span-1'>:</span>
					<span className='text-xs font-bold col-span-6 flex items-center'>
						{maskEmail('example@email.com')}{' '}
						<CopyToClipboard
							text={user?.email}
							textColor='text-gray-100'
							size='text-xs'
						/>
					</span>
				</li>
				{/* For UID */}
				<li className='grid grid-cols-12 gap-2 items-center'>
					<span className='text-xs font-bold col-span-5'>UID</span>
					<span className='font-bold col-span-1'>:</span>
					<span className='text-xs font-bold col-span-6 flex items-center'>
						{user?.customer_id}
						<CopyToClipboard
							text={user?.customer_id}
							textColor='text-gray-100'
							size='text-xs'
						/>
					</span>
				</li>

				{/* For Status */}

				<li className='grid grid-cols-12 gap-2 items-center'>
					<span className='text-xs font-bold col-span-5'>Status</span>
					<span className='font-bold col-span-1'>:</span>
					<span className='text-xs font-bold col-span-6 text-red-500 '>
						Inactive
					</span>
				</li>
			</div>
		</div>
	);
};

export default UserInfo;
