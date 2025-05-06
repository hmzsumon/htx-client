'use client';
import { useGetActiveAnnouncementsQuery } from '@/redux/features/announcement/announcementApi';
import React from 'react';
import Marquee from 'react-fast-marquee';
const AnnouncementBanner = () => {
	const { data } = useGetActiveAnnouncementsQuery();
	const announcement = data?.announcement || {};
	return (
		<>
			{/* Notice */}
			<div className='flex items-center gap-1 mt-1 md:mx-5'>
				<div>
					<span role='img' aria-label='notification'>
						📢
					</span>
				</div>
				<div className='flex-1'>
					<Marquee
						speed={50}
						gradientWidth={0}
						gradientColor='white'
						className='text-xs text-gray-700'
					>
						<p className='text-xs font-semibold '>
							{announcement?.message || 'No announcement available.'}
						</p>
					</Marquee>
				</div>
			</div>
		</>
	);
};

export default AnnouncementBanner;
