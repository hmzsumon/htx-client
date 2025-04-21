import React from 'react';
import Image from 'next/image';

const TrustItem = ({ title, description, icon }: any) => {
	return (
		<div className='flex md:flex-col gap-4 items-center'>
			<div className=''>
				<Image src={icon} alt='icon' className='  w-32 ' />
			</div>
			<div className='space-y-2 text-left'>
				<h1 className='text-xl md:text-2xl font-bold'>{title}</h1>
				<p className='text-sm text-gray-500'>{description}</p>
			</div>
		</div>
	);
};

export default TrustItem;
