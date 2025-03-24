'use client';
import React, { useState, useRef, useEffect, use } from 'react';
import { MdCandlestickChart } from 'react-icons/md';
import { AiOutlineLineChart } from 'react-icons/ai';
import { BiTransferAlt } from 'react-icons/bi';
import RealtimeEmulation from './RealtimeEmulation';
import socketIOClient from 'socket.io-client';
import { useSelector } from 'react-redux';
import TradeHeader from './TradeHeader';
import Logo from '@/public/images/logos/logo_black.png';
import Image from 'next/image';

const TradeHome: React.FC = (props) => {
	const { symbol } = useSelector((state: any) => state.trade);
	const [k_line, setK_line] = useState<boolean>(true);
	const [time, setTime] = useState<string>('5m');

	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [ticker, setTicker] = useState<any>({});
	// console.log(ticker.lastPrice.length);

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

	const [tickers, setTickers] = React.useState<any[]>([]);
	// console.log(tickers);

	useEffect(() => {
		const socket = socketIOClient('http://localhost:5000');
		socket.on('tickers', (data: any[]) => {
			setTickers(data);

			// find ticker by symbol
			const f_ticker = data.find((t) => t.symbol === symbol);
			setTicker(f_ticker);
		});

		return () => {
			socket.disconnect();
		};
	}, [symbol]);

	return (
		<div className='py-4 bg-gray-100'>
			<div>
				<div className='w-full px-4 mx-auto '>
					<TradeHeader setOpen={setOpen} open={open} ticker={ticker} />
					<div className='relative flex flex-col items-center justify-between z-50 space-y-3 '>
						<div className='absolute top-[35%]'>
							<Image src={Logo} alt='logo' className='w-72' />
						</div>
						<div className='w-full mx-auto md:h-[300px]'>
							<div className='flex items-center justify-around p-1 text-xs list-none text-blue-gray-300 bg-blue-gray-900 md:text-md bg-slate-300'>
								<li
									className={`cursor-pointer ${
										time === '5m' ? 'text-green-500' : ''
									}`}
									onClick={() => handleSetTime('5m')}
								>
									5m
								</li>
								<li
									className={`cursor-pointer ${
										time === '15m' ? 'text-yellow-700' : ''
									}`}
									onClick={() => handleSetTime('15m')}
								>
									15m
								</li>
								<li
									className={`
								cursor-pointer ${time === '1h' ? 'text-yellow-700' : ''}
							`}
									onClick={() => setTime('1h')}
								>
									1h
								</li>
								<li
									className={`
								cursor-pointer ${time === '4h' ? 'text-yellow-700' : ''}
							`}
									onClick={() => setTime('4h')}
								>
									4h
								</li>
								<li
									className={`
								cursor-pointer ${time === '1d' ? 'text-yellow-700' : ''}
							`}
									onClick={() => setTime('1d')}
								>
									1D
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
					{/* <Trades /> */}
				</div>
			</div>
		</div>
	);
};

export default TradeHome;
