import React from 'react';
import Container from '../layout/Container';
import TradeImg from '@/public/images/trade/trade_img_2.png';
import Image from 'next/image';

const TradeAnytime = () => {
	return (
		<Container>
			<div className=' space-y-3'>
				<h1 className='text-xl md:text-3xl font-bold text-center text-gray-800'>
					Trade anytime, anywhere
				</h1>
				<div>
					<Image
						src={TradeImg}
						alt='trade-img'
						className='w-96 md:mx-auto md:w-[50rem] '
					/>
				</div>
			</div>
		</Container>
	);
};

export default TradeAnytime;
