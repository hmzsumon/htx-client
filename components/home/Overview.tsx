import React from 'react';
import Container from '../layout/Container';
import { clsx } from 'clsx';
import {
	ChartCandlestick,
	HandHeart,
	TableOfContents,
	Users,
} from 'lucide-react';

const Overview = () => {
	return (
		<Container>
			<div>
				<div className='flex flex-col gap-1 items-center justify-center'>
					<h1 className='text-4xl font-bold'>Overview</h1>
					<p className='text-sm text-gray-800'>
						A wide variety of trading tools to choose from
					</p>
				</div>
				<div className='my-6 grid grid-cols-1 md:grid-cols-3 gap-6'>
					<div className='flex gap-4 items-center'>
						<Users size={36} className='text-htx-blue' />
						<div>
							<h1 className='text-xl font-bold text-gray-800'>1.8M Members</h1>
							<p className='text-xs'>Connect and Grow Together</p>
						</div>
					</div>
					<div className='flex gap-2 items-center'>
						<TableOfContents size={36} className='text-htx-blue' />
						<div>
							<h1 className='text-xl font-bold text-gray-800'>
								{' '}
								$80k Transactions
							</h1>
							<p className='text-xs'>Trusted and Secure Deals</p>
						</div>
					</div>
					<div className='flex gap-2 items-center'>
						<HandHeart size={36} className='text-htx-blue' />
						<div>
							<h1 className='text-xl font-bold text-gray-800'>
								Trusted By 39,000+
							</h1>
							<p className='text-xs'>Happy Clients</p>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default Overview;
