import React from 'react';
import Container from '../layout/Container';
import { clsx } from 'clsx';

const TradeVolume = () => {
	return (
		<div className='bg-htx-blue'>
			<Container>
				<div className=' py-10 flex flex-col gap-4 items-center justify-center'>
					<p className='text-white'>24h Trading Volume</p>
					<h2 className='text-4xl font-bold text-white'>$2,441,698,048</h2>
				</div>
			</Container>
		</div>
	);
};

export default TradeVolume;
