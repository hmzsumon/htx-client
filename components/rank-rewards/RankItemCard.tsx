import React from 'react';
import { Card } from '../ui/card';
import Image from 'next/image';
import MoneyBag from '@/public/images/icons/money-bag.png';
import ArrowR from '@/public/images/icons/right-arrow.png';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const RankItemCard = ({ item }: any) => {
	return (
		<div>
			<Card className='p-4'>
				<Link href={item.link}>
					<div className=' flex items-center justify-between'>
						<div className='flex items-center gap-2'>
							{item.icon}
							<h2 className='text-md font-bold'>{item.name}</h2>
						</div>

						<div className='flex  items-center gap-x-2'>
							<Card className=' p-2 rounded-full'>
								<Image src={MoneyBag} alt='Money Bag' className='w-6 h-6' />
							</Card>
							<div className=' flex items-center gap-1'>
								<p className=' font-bold'>Salary: </p>
								<p className=' font-bold mt-1'>{item.salary}$</p>
							</div>
						</div>

						<div>
							<Image
								src={ArrowR}
								alt='Money Bag'
								className='w-6 h-6 cursor-pointer'
							/>
						</div>
					</div>
				</Link>
			</Card>
		</div>
	);
};

export default RankItemCard;
