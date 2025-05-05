'use client';
import React from 'react';
import TradeMax from '@/public/images/icons/trade_max.webp';
import GlobalTradeViewTemplate from '@/components/trade/GlobalTradeViewTemplate';
import { useInnerContext } from '@/context/InnerContext';

const TradeMaxPage = () => {
	const context = useInnerContext();
	const { team_a, team_b, team_c, total_team } = context;
	return (
		<div className=''>
			<div>
				<GlobalTradeViewTemplate
					tradeImg={TradeMax}
					title='Trade Max'
					balance={5000}
					conditions={[
						{
							title: 'Direct Joining Team "A"',
							value: `${team_a}/15 User's`,
						},
						{
							title: 'Joining Team ("B" + "C")',
							value: `${team_b + team_c}/35 User's`,
						},
						{
							title: "Total Team Member's",
							value: `${total_team}/50 User's`,
						},
					]}
					dailyProfit={[
						{
							title: 'Daily Personal Profit',
							value: '0 - 12% +',
						},
						{
							title: 'Profit Team ("A")',
							value: '14%',
						},
						{
							title: 'Profit Team ("B")',
							value: '5%',
						},
						{
							title: 'Profit Team ("C")',
							value: '3%',
						},
					]}
				/>
			</div>
		</div>
	);
};

export default TradeMaxPage;
