'use client';
import React from 'react';
import { Card } from '../ui/card';
import Image from 'next/image';
import Gmail from '@/public/images/icons/gmail.png';
import Phone from '@/public/images/icons/phone-book.png';
import Edit from '@/public/images/icons/edit.png';

import { useSelector } from 'react-redux';

const ContactInfoCard = () => {
	const { user } = useSelector((state: any) => state.auth);
	return (
		<div>
			<Card className='p-4 space-y-4 bg-fuchsia-200'>
				<div>
					<h2 className='text-gray-800 font-bold'>Contact Info</h2>
				</div>
				<hr />
				<div className=' text-xs font-bold space-y-2'>
					<Card className='p-2 '>
						<div className=' flex items-center gap-2 '>
							<Image
								src={Gmail}
								alt='icon'
								className='w-5 h-5 object-contain'
							/>
							<p>{user?.email}</p>
						</div>
					</Card>
					<Card className='p-2'>
						<div className='flex justify-between items-center'>
							<div className=' flex items-center gap-2 '>
								<Image
									src={Phone}
									alt='icon'
									className='w-6 h-6 object-contain'
								/>
								<p>{user?.mobile}</p>
							</div>
							<div>
								<Image
									src={Edit}
									alt='icon'
									className='w-6 h-6 object-contain'
								/>
							</div>
						</div>
					</Card>
				</div>
			</Card>
		</div>
	);
};

export default ContactInfoCard;
