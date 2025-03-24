import React from 'react';
import TradeMaster from '@/public/images/icons/trade_master.webp';
import GlobalTradeViewTemplate from '@/components/trade/GlobalTradeViewTemplate';
import GoBack from '@/components/GoBack';

const TradeMasterPage = () => {
	return (
		<div className='relative'>
			<div className='absolute top-0 -left-2 p-4'>
				<GoBack color='text-gray-800' />
			</div>
			<div>
				<GlobalTradeViewTemplate
					tradeImg={TradeMaster}
					title='Trade Master'
					balance={10000}
					conditions={[
						{
							title: 'Direct Joining Team "A"',
							value: "0/25 User's",
						},
						{
							title: 'Joining Team ("B" + "C")',
							value: "0/65 User's",
						},
						{
							title: "Total Team Member's",
							value: "0/90 User's",
						},
					]}
					dailyProfit={[
						{
							title: 'Daily Persona Profit',
							value: '0 - 15% +',
						},
						{
							title: 'Profit Team ("A")',
							value: '20%',
						},
						{
							title: 'Profit Team ("B")',
							value: '9%',
						},
						{
							title: 'Profit Team ("C")',
							value: '6%',
						},
					]}
				/>
			</div>
		</div>
	);
};

export default TradeMasterPage;
