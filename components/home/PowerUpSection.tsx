import React from 'react';
import { Button } from '../ui/button';

const PowerUpSection = () => {
	return (
		<div className='bg-htx-blue px-4'>
			<div className='md:w-7/12 mx-auto py-10 flex flex-col gap-4 items-center justify-center'>
				<h1 className='text-xl md:text-3xl font-bold text-white text-center'>
					Power up your trading with an unbeatable deposit bonus!
				</h1>
				<p className='text-xs md:text-sm text-gray-300'>
					Power your trades with an exclusive deposit bonus! Unlock greater
					opportunities and elevate your trading experience!
				</p>
				<Button
					variant='ghost'
					className='w-full border rounded-2xl text-white py-2 '
				>
					Start Trading Now
				</Button>
			</div>
		</div>
	);
};

export default PowerUpSection;
