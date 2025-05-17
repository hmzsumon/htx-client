'use client';
import React from 'react';
import TradePro from '@/public/images/icons/trade_pro.webp';
import GlobalTradeViewTemplate from '@/components/trade/GlobalTradeViewTemplate';
import { useInnerContext } from '@/context/InnerContext';

const TradeProPage = () => {
	const context = useInnerContext();
	const { team_a, team_b, team_c, total_team } = context;
	return (
		<div className=''>
			<div>
				<GlobalTradeViewTemplate
					tradeImg={TradePro}
					title='Trade Pro'
					balance={300}
					conditions={[
						{
							title: 'Direct Joining Team "A"',
							value: `${team_a}/6 User's`,
						},
						{
							title: 'Joining Team ("B" + "C")',
							value: `${team_b + team_c}/20 User's`,
						},
						{
							title: "Total Team Member's",
							value: `${total_team}/26 User's`,
						},
					]}
					dailyProfit={[
						{
							title: 'Daily Personal Profit',
							value: '0 - 9% +',
						},
						{
							title: 'Profit Team ("A")',
							value: '7%',
						},
						{
							title: 'Profit Team ("B")',
							value: '3%',
						},
						{
							title: 'Profit Team ("C")',
							value: '1%',
						},
					]}
				/>
			</div>
		</div>
	);
};

export default TradeProPage;
