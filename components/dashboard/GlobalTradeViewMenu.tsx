'use client';
import React from 'react';
import DashboardMenuCard from './DashboardMenuCard';
import TradeLite from '@/public/images/icons/trade_max.webp';
import TradeElite from '@/public/images/icons/trade_elite.webp';
import TradePro from '@/public/images/icons/trade_pro.webp';
import { useSelector } from 'react-redux';

const GlobalTradeViewMenu = () => {
	const { user } = useSelector((state: any) => state.auth);
	const items = [
		{
			id: 1,
			title: 'Trade Lite',
			icon: null,
			iconImg: TradeLite,
			is_active: user?.current_trade_package === 'TradeLite' ? true : false,
			link: '/trade-lite',
		},
		{
			id: 2,
			title: 'Trade Elite',
			icon: null,
			iconImg: TradeElite,
			is_active: user?.current_trade_package === 'TradeElite' ? true : false,
			link: '/trade-elite',
		},
		{
			id: 3,
			title: 'Trade Pro',
			icon: null,
			iconImg: TradePro,
			is_active: user?.current_trade_package === 'TradePro' ? true : false,
			link: '/trade-pro',
		},
	];

	return (
		<>
			<DashboardMenuCard
				title='Live Trade View'
				items={items}
				bgColor={'bg-[#deedfd]'}
			/>
		</>
	);
};

export default GlobalTradeViewMenu;
