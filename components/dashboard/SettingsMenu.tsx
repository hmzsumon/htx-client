'use client'; // ✅ Ensure it's a client component
import React from 'react';
import DashboardMenuCard from './DashboardMenuCard';
import Wallet from '@/public/images/icons/wallet.png';
import Password from '@/public/images/icons/reset-password.png';
import Pin from '@/public/images/icons/reset-pin.png';
import PersonalInfo from '@/public/images/icons/user-edit.png';

const items = [
	{
		id: 1,
		title: 'Personal Info',
		icon: null,
		iconImg: PersonalInfo,
		link: '/settings/personal-info',
	},
	{
		id: 2,
		title: 'Reset Password',
		icon: null,
		iconImg: Password,
		link: '/settings/reset-password',
	},
	{
		id: 3,
		title: 'Reset Pin',
		icon: null,
		iconImg: Pin,
		link: '/settings/reset-pin',
	},
];

const SettingsMenu = () => {
	return (
		<>
			<DashboardMenuCard
				title='Settings'
				items={items}
				bgColor={'bg-[#d5f1e4]'}
			/>
		</>
	);
};

export default SettingsMenu;
