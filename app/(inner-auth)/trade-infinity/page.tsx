import React from 'react';
import TradeInfinity from '@/public/images/icons/trade_infinity.webp';
import GlobalTradeViewTemplate from '@/components/trade/GlobalTradeViewTemplate';
import GoBack from '@/components/GoBack';

const TradeInfinityPage = () => {
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
							value: "0/40 User's",
						},
						{
							title: 'Joining Team ("B" + "C")',
							value: "0/170 User's",
						},
						{
							title: "Total Team Member's",
							value: "0/210 User's",
						},
					]}
					dailyProfit={[
						{
							title: 'Daily Persona Profit',
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
