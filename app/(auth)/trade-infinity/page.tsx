import React from 'react';
import TradeInfinity from '@/public/images/icons/trade_infinity.webp';
import GlobalTradeViewTemplate from '@/components/trade/GlobalTradeViewTemplate';
import GoBack from '@/components/GoBack';

const TradeInfinityPage = () => {
	return (
		<div className='relative'>
			<div className='absolute top-0 -left-2 p-4'>
				<GoBack color='text-gray-800' />
			</div>
			<div>
				<GlobalTradeViewTemplate
					tradeImg={TradeInfinity}
					title='Trade Infinity'
					balance={30000}
					conditions={[
						{
							title: 'Direct Joining Team "A"',
							value: "0/35 User's",
						},
						{
							title: 'Joining Team ("B" + "C")',
							value: "0/165 User's",
						},
						{
							title: "Total Team Member's",
							value: "0/200 User's",
						},
					]}
					dailyProfit={[
						{
							title: 'Daily Persona Profit',
							value: '0 - 20% +',
						},
						{
							title: 'Profit Team ("A")',
							value: '25%',
						},
						{
							title: 'Profit Team ("B")',
							value: '12%',
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
