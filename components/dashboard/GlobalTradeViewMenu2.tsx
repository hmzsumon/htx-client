'use client';
import React from 'react';
import DashboardMenuCard from './DashboardMenuCard';
import TradeMax from '@/public/images/icons/trade_bost.webp';
import TradeMaster from '@/public/images/icons/trade_master.webp';
import TradeInfinity from '@/public/images/icons/trade_infinity.webp';

const items = [
	{
		id: 4,
		title: 'Trade Max',
		icon: null,
		iconImg: TradeMax,
		link: '/trade-max',
	},
	{
		id: 5,
		title: 'Trade Master',
		icon: null,
		iconImg: TradeMaster,
		link: '/trade-master',
	},
	{
		id: 6,
		title: 'Trade Infinity',
		icon: null,
		iconImg: TradeInfinity,
		link: '/trade-infinity',
	},
];

const GlobalTradeViewMenu2 = () => {
	return (
		<>
			<DashboardMenuCard
				title='Live Trade View'
				items={items}
				bgColor={'bg-[#efebc3]'}
			/>
		</>
	);
};

export default GlobalTradeViewMenu2;
