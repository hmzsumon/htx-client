'use client';
import CopyToClipboard from '@/lib/CopyToClipboard';
import React, { useState } from 'react';
import { FaQrcode } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RWebShare } from 'react-web-share';
import { Card } from '../ui/card';

const LinkCard = () => {
	const { user } = useSelector((state: any) => state.auth);
	const partnerId = user?.customer_id;
	// get host
	const host = window.location.host;
	// create referral link wit user customer_id
	let referralLink = '';
	if (process.env.NODE_ENV === 'development') {
		referralLink = `http://${host}/register?partner_code=${user?.customer_id}`;
	} else {
		referralLink = `https://${host}/register?partner_code=${user?.customer_id}`;
	}
	const [showLink, setShowLink] = useState(1);
	return (
		<Card className=' bg-slate-300 p-4 border rounded mt-5'>
			<div className='flex justify-between items-center text-xs font-bold'>
				<div className='flex items-center gap-5'>
					<button
						onClick={() => setShowLink(1)}
						className={
							showLink == 1
								? 'text-gray-50 bg-htx-blue p-2 rounded-md'
								: 'bg-gray-300 p-2 rounded-md text-gray-800'
						}
					>
						Refer link
					</button>
					<button
						onClick={() => setShowLink(2)}
						className={
							showLink == 2
								? 'text-gray-50 bg-htx-blue p-2 rounded-md'
								: 'bg-gray-300 p-2 rounded-md text-gray-800'
						}
					>
						Refer code
					</button>
				</div>
			</div>
			{showLink == 1 && (
				<div className='my-5 border-b border-gray-400 flex items-center justify-between'>
					<p className=' text-htx-blue font-bold  text-xs'>{referralLink}</p>
					<CopyToClipboard text={referralLink} />
				</div>
			)}
			{showLink == 2 && (
				<div className='my-5 border-b border-gray-400  flex items-center justify-between'>
					<p className='text-xs font-bold'>
						Your Refer Code:{' '}
						<span className=' font-bold text-htx-blue'>{partnerId}</span>
					</p>
					<CopyToClipboard text={partnerId} />
				</div>
			)}
			<div className='flex items-center grid-cols-8 gap-4 mt-4 '>
				<RWebShare data={{ url: referralLink }}>
					<div className='relative flex-1 col-span-7 p-3 bg-htx-blue cursor-pointer rounded-xl'>
						<div>
							<h2 className='text-xl font-bold text-center text-gray-100 '>
								Invite Friend{' '}
							</h2>
						</div>
					</div>
				</RWebShare>
				<div className='flex items-center justify-center col-span-1 p-4 bg-[#474D57] rounded-xl'>
					<FaQrcode className='inline-block text-xl text-gray-400 cursor-pointer ' />
				</div>
			</div>
		</Card>
	);
};

export default LinkCard;
