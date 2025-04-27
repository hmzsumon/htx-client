import React from 'react';
import TradeElite from '@/public/images/icons/trade_elite.webp';
import GlobalTradeViewTemplate from '@/components/trade/GlobalTradeViewTemplate';
import GoBack from '@/components/GoBack';

const TradeElitePage = () => {
	return (
		<div className=''>
			<div>
				<GlobalTradeViewTemplate
					tradeImg={TradeElite}
					title='Trade Elite'
					balance={500}
					conditions={[
						{
							title: 'Direct Joining Team "A"',
							value: "0/3 User's",
						},
						{
							title: 'Joining Team ("B" + "C")',
							value: "0/5 User's",
						},
						{
							title: "Total Team Member's",
							value: "0/8 User's",
						},
					]}
					dailyProfit={[
						{
							title: 'Daily Persona Profit',
							value: '0 - 6% +',
						},
						{
							title: 'Profit Team ("A")',
							value: '10%',
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

export default TradeElitePage;
