import React from 'react';
import TradeElite from '@/public/images/icons/trade_elite.webp';
import GlobalTradeViewTemplate from '@/components/trade/GlobalTradeViewTemplate';
import GoBack from '@/components/GoBack';

const TradeElitePage = () => {
	return (
		<div className='relative'>
			<div className='absolute top-0 -left-2 p-4'>
				<GoBack color='text-gray-800' />
			</div>
			<div>
				<GlobalTradeViewTemplate
					tradeImg={TradeElite}
					title='Trade Elite'
					balance={600}
					conditions={[
						{
							title: 'Direct Joining Team "A"',
							value: "0/4 User's",
						},
						{
							title: 'Joining Team ("B" + "C")',
							value: "0/6 User's",
						},
						{
							title: "Total Team Member's",
							value: "0/10 User's",
						},
					]}
					dailyProfit={[
						{
							title: 'Daily Persona Profit',
							value: '0 - 6% +',
						},
						{
							title: 'Profit Team ("A")',
							value: '12%',
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

export default TradeElitePage;
