'use client';
import React from 'react';
import Image from 'next/image';
import ProfileImg from '@/public/images/profile-avatar/avatar_1.png';
import { formatDate, maskEmail } from '@/lib/functions';
import { useSelector } from 'react-redux';
import CopyToClipboard from '@/lib/CopyToClipboard';

const UserInfo2 = () => {
	const { user } = useSelector((state: any) => state.auth);
	return (
		<div className='flex items-center gap-3 text-white'>
			<div className='flex flex-col items-center gap-2 mt-4'>
				<Image
					src={ProfileImg}
					alt='profile'
					className=' w-16 h-16 rounded-full object-cover'
				/>
				<div className='text-center bg-green-500 text-white p-1 text-xs font-bold rounded-md min-w-[60px]'>
					<h2>{user.rank}</h2>
				</div>
			</div>
			<div className='mt-4 list-none space-y-1 '>
				<h2 className='text-red-500 text-gradient text-sm font-bold text-left'>
					{user?.name}
				</h2>

				<div>
					<li className='grid grid-cols-12 items-center'>
						<span className='text-xs font-bold col-span-3'>Created</span>
						<span className='font-bold col-span-1'>:</span>
						<span className='text-xs font-bold col-span-8'>
							{formatDate(user?.createdAt)}
						</span>
					</li>

					<li className='grid grid-cols-12  items-center'>
						<span className='text-xs font-bold col-span-3'>UID</span>
						<span className='font-bold col-span-1'>:</span>
						<span className='text-xs font-bold col-span-8 flex items-center'>
							{user?.customer_id}
							<CopyToClipboard
								text={user?.customer_id}
								textColor='text-gray-100'
								size='text-xs'
							/>
						</span>
					</li>

					<li className='grid grid-cols-12  items-center'>
						<span className='text-xs font-bold col-span-3'>Status</span>
						<span className='font-bold col-span-1'>:</span>
						<span className='text-xs font-bold col-span-8 text-red-500 '>
							<span>Inactive</span> {''}
							<span className='text-white'> (TradeInfinity)</span>
						</span>
					</li>
				</div>
			</div>
		</div>
	);
};

export default UserInfo2;
