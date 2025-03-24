'use client'; // ✅ Ensure it's a client component
import React from 'react';
import TradeImg1 from '@/public/images/icons/trade_1.png';
import TradeImg2 from '@/public/images/icons/trade_2.png';
import TradeImg3 from '@/public/images/icons/trade_3.png';
import DashboardMenuCard from './DashboardMenuCard';
import { link } from 'fs';

const items = [
	{
		id: 1,
		title: 'Personal Trade',
		icon: null,
		iconImg: TradeImg1,
		link: '/trade/personal-trade',
	},
	{
		id: 2,
		title: 'Signal Trade',
		icon: null,
		iconImg: TradeImg2,
		link: '/trade/signal-trade',
	},
	{
		id: 3,
		title: 'Live Trade',
		icon: null,
		iconImg: TradeImg3,
		link: '/trade/live-trade',
	},
];

const TradeMenu = () => {
	return (
		<>
			<DashboardMenuCard
				title='HTX Trade'
				items={items}
				bgColor={'bg-[#fff3e2]'}
			/>
		</>
	);
};

export default TradeMenu;
