import React from 'react';
import TradeMax from '@/public/images/icons/trade_max.webp';
import GlobalTradeViewTemplate from '@/components/trade/GlobalTradeViewTemplate';
import GoBack from '@/components/GoBack';

const TradeMaxPage = () => {
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
							value: "0/15 User's",
						},
						{
							title: 'Joining Team ("B" + "C")',
							value: "0/35User's",
						},
						{
							title: "Total Team Member's",
							value: "0/50 User's",
						},
					]}
					dailyProfit={[
						{
							title: 'Daily Persona Profit',
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
