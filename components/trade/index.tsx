import React, { useState } from 'react';
import RealtimeEmulation from './RealtimeEmulation';
import Logo from '@/public/images/logos/logo_black.png';
import Image from 'next/image';
import TradeRound from './TradeRound';

const TradeHome: React.FC = (props) => {
	return (
		<div className=' bg-gray-100 mt-1 pb-14 '>
			<div className='w-full  mx-auto '>
				<div className='relative flex flex-col items-center justify-between z-40 space-y-3 '>
					{/* Start Logo */}
					<div className='absolute top-[50%] md:top-[50%]'>
						<Image src={Logo} alt='logo' className='w-40 md:w-72' />
					</div>
					{/* End Logo */}
					<div className='w-full mx-auto md:h-[300px]'>
						<RealtimeEmulation />
					</div>
				</div>
			</div>
			<div>
				<TradeRound />
			</div>
		</div>
	);
};

export default TradeHome;
