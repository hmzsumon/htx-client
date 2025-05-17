'use client';
import React from 'react';
import TradeMaster from '@/public/images/icons/trade_master.webp';
import GlobalTradeViewTemplate from '@/components/trade/GlobalTradeViewTemplate';

import { useInnerContext } from '@/context/InnerContext';

const TradeMasterPage = () => {
	const context = useInnerContext();
	const { team_a, team_b, team_c, total_team } = context;

	return (
		<div className=''>
			<div>
				<GlobalTradeViewTemplate
					tradeImg={TradeMaster}
					title='Trade Master'
					balance={500}
					conditions={[
						{
							title: 'Direct Joining Team "A"',
							value: `${team_a}/25 User's`,
						},
						{
							title: 'Joining Team ("B" + "C")',
							value: `${team_b + team_c}/70 User's`,
						},
						{
							title: "Total Team Member's",
							value: `${total_team}/95 User's`,
						},
					]}
					dailyProfit={[
						{
							title: 'Daily Personal Profit',
							value: '0 - 15% +',
						},
						{
							title: 'Profit Team ("A")',
							value: '11%',
						},
						{
							title: 'Profit Team ("B")',
							value: '5%',
						},
						{
							title: 'Profit Team ("C")',
							value: '2%',
						},
					]}
				/>
			</div>
		</div>
	);
};

export default TradeMasterPage;
