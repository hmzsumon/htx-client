import React from 'react';
import TradePro from '@/public/images/icons/trade_pro.webp';
import GlobalTradeViewTemplate from '@/components/trade/GlobalTradeViewTemplate';
import GoBack from '@/components/GoBack';

const TradeProPage = () => {
	return (
		<div className=''>
			<div>
				<GlobalTradeViewTemplate
					tradeImg={TradePro}
					title='Trade Pro'
					balance={2000}
					conditions={[
						{
							title: 'Direct Joining Team "A"',
							value: "0/6 User's",
						},
						{
							title: 'Joining Team ("B" + "C")',
							value: "0/20 User's",
						},
						{
							title: "Total Team Member's",
							value: "0/26 User's",
						},
					]}
					dailyProfit={[
						{
							title: 'Daily Persona Profit',
							value: '0 - 9% +',
						},
						{
							title: 'Profit Team ("A")',
							value: '12%',
						},
						{
							title: 'Profit Team ("B")',
							value: '4%',
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

export default TradeProPage;
