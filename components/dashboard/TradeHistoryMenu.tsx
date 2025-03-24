'use client'; // ✅ Ensure it's a client component
import React from 'react';
import { Card } from '../ui/card';
import { ChartCandlestick } from 'lucide-react';
import DashboardMenuCard from './DashboardMenuCard';

const items = [
	{
		id: 1,
		title: 'Personal Trade',
		icon: ChartCandlestick,
	},
	{
		id: 2,
		title: 'Signal Trade',
		icon: ChartCandlestick,
	},
	{
		id: 3,
		title: 'Global Trade',
		icon: ChartCandlestick,
	},
];

const TradeHistoryMenu = () => {
	return (
		<>
			<DashboardMenuCard
				title='HTX Trade History'
				items={items}
				bgColor={'bg-[#deedfd]'}
			/>
		</>
	);
};

export default TradeHistoryMenu;
