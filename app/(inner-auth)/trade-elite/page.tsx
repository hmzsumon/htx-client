'use client';
import React from 'react';
import TradeElite from '@/public/images/icons/trade_elite.webp';
import GlobalTradeViewTemplate from '@/components/trade/GlobalTradeViewTemplate';
import GoBack from '@/components/GoBack';
import { useInnerContext } from '@/context/InnerContext';

const TradeElitePage = () => {
	const context = useInnerContext();
	const { team_a, team_b, team_c, total_team } = context;

	return (
		<div className=''>
			<div>
				<GlobalTradeViewTemplate
					tradeImg={TradeElite}
					title='Trade Elite'
					balance={200}
					conditions={[
						{
							title: 'Direct Joining Team "A"',
							value: `${team_a}/3 User's`,
						},
						{
							title: 'Joining Team ("B" + "C")',
							value: `${team_b + team_c} /5 User's`,
						},
						{
							title: "Total Team Member's",
							value: `${total_team}/8 User's`,
						},
					]}
					dailyProfit={[
						{
							title: 'Daily Personal Profit',
							value: '0 - 6% +',
						},
						{
							title: 'Profit Team ("A")',
							value: '5%',
						},
						{
							title: 'Profit Team ("B")',
							value: '2%',
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

export default TradeElitePage;
