import { Box } from 'lucide-react';
import React from 'react';
import { clsx } from 'clsx';

const TrustItem = () => {
	return (
		<div className='flex md:flex-col gap-6'>
			<div className='flex md:items-center justify-center'>
				<Box size={45} className='text-htx-blue' />
			</div>
			<div className='space-y-2 text-left'>
				<h1 className='text-lg md:text-2xl font-bold'>Secure Asset Storage</h1>
				<p className='text-sm text-gray-500'>
					Our industry-leading encryption and storage systems ensure that your
					assets are always safe and secure.
				</p>
			</div>
		</div>
	);
};

export default TrustItem;
