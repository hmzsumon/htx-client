import React from 'react';
import Container from '../layout/Container';
import { clsx } from 'clsx';
import {
	ChartCandlestick,
	HandHeart,
	TableOfContents,
	Users,
} from 'lucide-react';
import OverviewItem from './OverviewItem';

const Overview = () => {
	return (
		<Container>
			<div>
				<div className='flex flex-col gap-1 items-center justify-center'>
					<h1 className='text-4xl font-bold'>Overview</h1>
					{/* <p className='text-sm text-gray-800'>
						A wide variety of trading tools to choose from
					</p> */}
				</div>
				<div className='my-6 grid grid-cols-1 md:grid-cols-3 gap-6'>
					<OverviewItem
						title='1.8M Members'
						description='Connect and Grow Together'
						icon={<Users size={36} className='text-htx-blue' />}
					/>
					<OverviewItem
						title='$80k Transactions'
						description='Trusted and Secure Deals'
						icon={<TableOfContents size={36} className='text-htx-blue' />}
					/>

					<OverviewItem
						title='Trusted By 39,000+'
						description='Happy Clients'
						icon={<HandHeart size={36} className='text-htx-blue' />}
					/>
				</div>
			</div>
		</Container>
	);
};

export default Overview;
