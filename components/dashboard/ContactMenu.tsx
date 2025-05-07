'use client';
import React from 'react';
import DashboardMenuCard from './DashboardMenuCard';
import Mail from '@/public/images/icons/mail.png';
import Telegram from '@/public/images/icons/telegram.png';
import Inbox from '@/public/images/icons/inbox.png';

const items = [
	{
		id: 4,
		title: 'Support',
		icon: null,
		iconImg: Mail,
		link: '/contact/support',
	},
	{
		id: 5,
		title: 'Telegram',
		icon: null,
		iconImg: Telegram,
		link: '/contact/telegram',
	},
	{
		id: 6,
		title: 'Inbox',
		icon: null,
		iconImg: Inbox,
		link: '/notifications',
	},
];

const ContactMenu = () => {
	return (
		<>
			<DashboardMenuCard
				title='Contact Us'
				items={items}
				bgColor={'bg-[#e6ddec]'}
			/>
		</>
	);
};

export default ContactMenu;
