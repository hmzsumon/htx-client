'use client';
import React from 'react';
import TradeInfinity from '@/public/images/icons/trade_infinity.webp';
import GlobalTradeViewTemplate from '@/components/trade/GlobalTradeViewTemplate';

import { useInnerContext } from '@/context/InnerContext';

const TradeInfinityPage = () => {
	const context = useInnerContext();
	const { team_a, team_b, team_c, total_team } = context;
	return (
		<div className=''>
			<div>
				<GlobalTradeViewTemplate
					tradeImg={TradeInfinity}
					title='TradeInfinity'
					balance={30000}
					conditions={[
						{
							title: 'Direct Joining Team "A"',
							value: `${team_a}/40 User's`,
						},
						{
							title: 'Joining Team ("B" + "C")',
							value: `${team_b + team_c}/170 User's`,
						},
						{
							title: "Total Team Member's",
							value: `${total_team}/210 User's`,
						},
					]}
					dailyProfit={[
						{
							title: 'Daily Personal Profit',
							value: '0 - 20% +',
						},
						{
							title: 'Profit Team ("A")',
							value: '24%',
						},
						{
							title: 'Profit Team ("B")',
							value: '10%',
						},
						{
							title: 'Profit Team ("C")',
							value: '8%',
						},
					]}
				/>
			</div>
		</div>
	);
};

export default TradeInfinityPage;
