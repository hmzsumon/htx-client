'use client';
import React from 'react';
import DashboardMenuCard from '../dashboard/DashboardMenuCard';
import Deposit from '@/public/images/icons/deposit.png';
import Withdraw from '@/public/images/icons/withdraw.png';
import Transfer from '@/public/images/icons/money-transfer.png';

const items = [
	{
		id: 1,
		title: 'Deposit',
		icon: null,
		iconImg: Deposit,
		link: '/deposit-history',
	},
	{
		id: 2,
		title: 'Withdrawal',
		icon: null,
		iconImg: Withdraw,
		link: '/withdraw-history',
	},
	{
		id: 3,
		title: 'Transfer',
		icon: null,
		iconImg: Transfer,
		link: '/transfer-history',
	},
];

const HistoryMenu = () => {
	return (
		<>
			<DashboardMenuCard
				title='History View'
				items={items}
				bgColor={'bg-[#deedfd]'}
			/>
		</>
	);
};

export default HistoryMenu;
