'use client';
import React from 'react';
import DashboardMenuCard from './DashboardMenuCard';
import TradeLite from '@/public/images/icons/trade_max.webp';
import TradeElite from '@/public/images/icons/trade_elite.webp';
import TradePro from '@/public/images/icons/trade_pro.webp';

const items = [
	{
		id: 1,
		title: 'Trade Lite',
		icon: null,
		iconImg: TradeLite,
		link: '/trade-lite',
	},
	{
		id: 2,
		title: 'Trade Elite',
		icon: null,
		iconImg: TradeElite,
		link: '/trade-elite',
	},
	{
		id: 3,
		title: 'Trade Pro',
		icon: null,
		iconImg: TradePro,
		link: '/trade-pro',
	},
];

const GlobalTradeViewMenu = () => {
	return (
		<>
			<DashboardMenuCard
				title='Global Trade View'
				items={items}
				bgColor={'bg-[#deedfd]'}
			/>
		</>
	);
};

export default GlobalTradeViewMenu;
