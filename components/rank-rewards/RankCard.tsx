import React from 'react';
import { Card } from '../ui/card';
import Image from 'next/image';
import MoneyBag from '@/public/images/icons/money-bag.png';

function convertToK(num: number) {
	if (num >= 1000) {
		return Math.floor(num / 1000) + 'k'; // No decimals
	}
	return num.toString();
}

const RankCard = ({ item, amount }: any) => {
	return (
		<Card className='my-4 p-2'>
			<div className=' rounded my-2'>
				<div className=' space-y-4 '>
					<div className='flex flex-col items-center gap-4'>
						{/* Start Icon */}
						<div className='space-y-2'>
							<h2 className='text-center text-xl font-bold'>{item.title}</h2>
							<Card className='flex items-center justify-start gap-1 p-2'>
								{item.icon}
							</Card>
						</div>
						{/* End Icon */}
						<div className='flex items-center justify-between w-full gap-2'>
							{/* Start Conditions */}
							<div className='space-y-4'>
								<div className='space-y-2'>
									<h2 className=' text-sm font-bold'>
										Rank Achieve Conditions
									</h2>
									<hr />
									<div className=' list-none text-xs font-semibold space-y-1'>
										{item.conditions.map((condition: any, index: number) => (
											<li className='grid grid-cols-12 gap-2'>
												<span className=' col-span-8'>{condition.title}</span>
												<span className=' col-span-1'>:</span>
												<span className=' col-span-3'>{condition.value}</span>
											</li>
										))}
									</div>
								</div>
								<hr className='border-2 border-gray-600' />
								<div className='space-y-2'>
									<h2 className=' text-sm font-bold'>
										Monthly Salary Conditions
									</h2>
									<hr />
									<div className=' list-none text-xs font-semibold space-y-1'>
										{item.conditions2.map((condition: any, index: number) => (
											<li className='grid grid-cols-12 gap-2'>
												<span className=' col-span-8'>{condition.title}</span>
												<span className=' col-span-1'>:</span>
												<span className=' col-span-3'>{condition.value}</span>
											</li>
										))}
									</div>
								</div>
							</div>
							{/* End Conditions */}
							{/* Start Salary */}
							<div className='flex  items-center gap-2'>
								<Card className=' p-4 rounded-full'>
									<Image src={MoneyBag} alt='Money Bag' className='w-10 h-10' />
								</Card>
								<div>
									<h2 className=' font-bold'>Salary: 200$</h2>
								</div>
							</div>
							{/* End Salary */}
						</div>
					</div>

					<div className='space-y-4'>
						<button
							className=' bg-htx-blue w-full p-2 rounded text-white text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed'
							disabled={!item.is_active}
						>
							{item.is_active ? 'Available' : 'Progress'}
						</button>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default RankCard;
