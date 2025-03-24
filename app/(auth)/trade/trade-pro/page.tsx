import React from 'react';
import TradePro from '@/public/images/icons/trade_pro.webp';
import GlobalTradeViewTemplate from '@/components/trade/GlobalTradeViewTemplate';
import GoBack from '@/components/GoBack';

const TradeProPage = () => {
	return (
		<div className='relative'>
			<div className='absolute top-0 -left-2 p-4'>
				<GoBack color='text-gray-800' />
			</div>
			<div>
				<GlobalTradeViewTemplate
					tradeImg={TradePro}
					title='Trade Pro'
					balance={2000}
					conditions={[
						{
							title: 'Direct Joining Team "A"',
							value: "0/7 User's",
						},
						{
							title: 'Joining Team ("B" + "C")',
							value: "0/18 User's",
						},
						{
							title: "Total Team Member's",
							value: "0/25 User's",
						},
					]}
					dailyProfit={[
						{
							title: 'Daily Persona Profit',
							value: '0 - 9% +',
						},
						{
							title: 'Profit Team ("A")',
							value: '14%',
						},
						{
							title: 'Profit Team ("B")',
							value: '6%',
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

export default TradeProPage;
