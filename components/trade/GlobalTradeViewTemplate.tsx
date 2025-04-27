'use client';
import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { Card } from '@/components/ui/card';

interface GlobalTradeViewTemplateProps {
	tradeImg: StaticImageData;
	title: string;
	balance: number;
	conditions: { title: string; value: string }[];
	dailyProfit: { title: string; value: string }[];
}

const GlobalTradeViewTemplate = ({
	tradeImg,
	title,
	balance,
	conditions,
	dailyProfit,
}: GlobalTradeViewTemplateProps) => {
	return (
		<div className='p-4 '>
			<div className='w-full mx-auto'>
				<Image
					src={tradeImg}
					alt='Trade Lite'
					className='w-10/12 md:w-4/12 mx-auto rounded-lg'
				/>
				<h2 className=' text-xl font-bold text-center mt-2 text-gray-800'>
					{title}
				</h2>
			</div>
			<div className='text-xs font-bold text-gray-800 mt-4 space-y-4'>
				<Card className='p-4 bg-neutral-100'>
					<h2>
						Wallet Balance:
						<span className='text-primary-500'> ${balance}</span>+{' '}
					</h2>
				</Card>

				<Card className='p-4 space-y-3 bg-neutral-100'>
					<h2>Conditions</h2>
					<hr />
					<div className='space-y-2'>
						{conditions.map((condition, index) => (
							<li key={index} className='grid grid-cols-12 gap-2 items-center'>
								<span className='text-xs font-bold col-span-7'>
									{condition.title}
								</span>
								<span className='font-bold col-span-1'>:</span>
								<span className='text-xs font-bold col-span-4'>
									{condition.value}
								</span>
							</li>
						))}
					</div>
				</Card>

				<Card className='p-4 space-y-3 bg-neutral-100'>
					<h2>Daily Profit</h2>
					<hr />
					<div className='space-y-2'>
						{dailyProfit.map((profit, index) => (
							<li key={index} className='grid grid-cols-12 gap-2 items-center'>
								<span className='text-xs font-bold col-span-7'>
									{profit.title}
								</span>
								<span className='font-bold col-span-1'>:</span>
								<span className='text-xs font-bold col-span-4'>
									{profit.value}
								</span>
							</li>
						))}
					</div>
				</Card>
			</div>
		</div>
	);
};

export default GlobalTradeViewTemplate;
