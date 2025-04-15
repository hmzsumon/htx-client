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
	const { symbol } = useSelector((state: any) => state.trade);
	const [k_line, setK_line] = useState<boolean>(true);
	const [time, setTime] = useState<string>('1m');

	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [ticker, setTicker] = useState<any>({});

	// handle kline change
	const handleKlineChange = () => {
		setK_line(!k_line);
		setIsLoading(true);
	};

	// handle set time
	const handleSetTime = (e: any) => {
		setTime(e);
		setIsLoading(true);
	};

	return (
		<div className=' bg-gray-100 mt-1 '>
			<div className='w-full  mx-auto '>
				<TradeHeader setOpen={setOpen} open={open} ticker={ticker} />

				<div className='relative flex flex-col items-center justify-between z-50 space-y-3 '>
					{/* Start Logo */}
					<div className='absolute top-[35%]'>
						<Image src={Logo} alt='logo' className='w-72' />
					</div>
					{/* End Logo */}
					<div className='w-full mx-auto md:h-[300px]'>
						<div className='flex items-center justify-around p-1 text-xs list-none text-blue-gray-300 bg-blue-gray-900 md:text-md bg-slate-300'>
							<li
								className={`cursor-pointer ${
									time === '1m' ? 'text-green-500 font-bold' : ''
								}`}
								onClick={() => handleSetTime('1m')}
							>
								1m
							</li>
							<li
								className={`cursor-pointer ${
									time === '3m' ? 'text-green-500 font-bold' : ''
								}`}
								onClick={() => handleSetTime('3m')}
							>
								3m
							</li>
							<li
								className={`
								cursor-pointer ${time === '5m' ? 'text-green-500 font-bold' : ''}
							`}
								onClick={() => setTime('5m')}
							>
								5m
							</li>
							<li
								className={`
								cursor-pointer ${time === '15m' ? 'text-green-500 font-bold' : ''}
							`}
								onClick={() => setTime('15m')}
							>
								15m
							</li>
							<li
								className={`
								cursor-pointer ${time === '30m' ? 'text-green-500 font-bold' : ''}
							`}
								onClick={() => setTime('30m')}
							>
								30m
							</li>
							<li
								className='text-yellow-700 cursor-pointer text-md'
								onClick={handleKlineChange}
							>
								{!k_line ? <AiOutlineLineChart /> : <MdCandlestickChart />}
							</li>
						</div>
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
