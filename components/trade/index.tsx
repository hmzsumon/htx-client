'use client';
import React, { useState } from 'react';
import { MdCandlestickChart } from 'react-icons/md';
import { AiOutlineLineChart } from 'react-icons/ai';
import RealtimeEmulation from './RealtimeEmulation';
import { useSelector } from 'react-redux';
import TradeHeader from './TradeHeader';
import Logo from '@/public/images/logos/logo_black.png';
import Image from 'next/image';
import TradeRound from './TradeRound';

const TradeHome: React.FC = (props) => {
	const [k_line, setK_line] = useState<boolean>(true);
	const [time, setTime] = useState<string>('1m');

	const [isLoading, setIsLoading] = useState(true);
	const [ticker, setTicker] = useState<any>({});

	return (
		<div className=' bg-gray-100 mt-1 pb-14 '>
			<div className='w-full  mx-auto '>
				<div className='relative flex flex-col items-center justify-between z-40 space-y-3 '>
					{/* Start Logo */}
					<div className='absolute top-[35%]'>
						<Image src={Logo} alt='logo' className='w-72' />
					</div>
					{/* End Logo */}
					<div className='w-full mx-auto md:h-[300px]'>
						<RealtimeEmulation
							kline={k_line}
							time={time}
							isLoading={isLoading}
							setIsLoading={setIsLoading}
						/>
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
