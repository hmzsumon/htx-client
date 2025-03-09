import { Box } from 'lucide-react';
import React from 'react';
import { clsx } from 'clsx';
import Overview from './Overview';

const OverviewItem = ({ title, description, icon }: any) => {
	return (
		<div className='flex md:flex-col gap-6'>
			<div className='flex md:items-center justify-center'>{icon}</div>
			<div className='space-y-1 text-left'>
				<h1 className='text-xl md:text-2xl font-bold'>{title}</h1>
				<p className='text-sm text-gray-500'>{description}</p>
			</div>
		</div>
	);
};

export default OverviewItem;
