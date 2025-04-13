import { Box } from 'lucide-react';
import React from 'react';
import Image from 'next/image';

const TrustItem = ({ title, description, icon }: any) => {
	return (
		<div className='flex md:flex-col gap-4'>
			<div className='flex md:items-center justify-center'>
				<Image src={icon} alt='icon' className='w-16 h-16 md:w-24 md:h-24' />
			</div>
			<div className='space-y-2 text-left'>
				<h1 className='text-xl md:text-2xl font-bold'>{title}</h1>
				<p className='text-sm text-gray-500'>{description}</p>
			</div>
		</div>
	);
};

export default TrustItem;
