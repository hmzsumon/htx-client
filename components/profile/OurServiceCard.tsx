import React from 'react';
import { Card } from '../ui/card';
import Image from 'next/image';
import Settings from '@/public/images/icons/settings.png';
import Feedback from '@/public/images/icons/feedback.png';
import Notify from '@/public/images/icons/megaphone.png';
import CustomerService from '@/public/images/icons/customer-service.png';
import Guid from '@/public/images/icons/guid.png';
import AboutUs from '@/public/images/icons/about-us.png';

const items = [
	{
		id: 1,
		title: 'Settings',
		img: Settings,
		link: '/dashboard',
	},
	{
		id: 2,
		title: 'Feedback',
		img: Feedback,
		link: '/dashboard',
	},
	{
		id: 3,
		title: 'Notification',
		img: Notify,
		link: '/dashboard',
	},
	{
		id: 4,
		title: 'Customer Service',
		img: CustomerService,
		link: '/dashboard',
	},
	{
		id: 5,
		title: "Beginner's Guide",
		img: Guid,
		link: '/dashboard',
	},
	{
		id: 6,
		title: 'About Us',
		img: AboutUs,
		link: '/dashboard',
	},
];

const OurServiceCard = () => {
	return (
		<div className='px-2 '>
			<Card className='p-4 bg-[#F7F8FF]'>
				<h2 className='text-sm font-bold'>Our Service Center</h2>
				<hr className='my-2' />
				<div className=' list-none mt-6 grid grid-cols-3 gap-4'>
					{items.map((item) => (
						<li
							key={item.id}
							className=' flex flex-col items-center gap-2 cursor-pointer  '
						>
							<Image src={item.img} alt='settings' className='w-8' />
							<span className='text-xs font-bold'>{item.title}</span>
						</li>
					))}
				</div>
			</Card>
		</div>
	);
};

export default OurServiceCard;
