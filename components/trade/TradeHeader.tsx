'use client';
import React, { useEffect, useState } from 'react';
import { BiTransferAlt } from 'react-icons/bi';
import { HiArrowSmLeft } from 'react-icons/hi';
import { BeatLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import { SymbolDrawer } from './SymbolDrawer';
import TradeDuration from './TradeDuration';
import LiveTradeDuration from './LiveTradeDuration';

const TradeHeader = ({ setOpen, open }: any) => {
	const router = useRouter();
	const pathname = usePathname();
	const lastSegment = pathname.split('/').pop();

	const isLiveTrade = lastSegment === 'live-trade' || lastSegment === 'trade';

	const { symbol } = useSelector((state: any) => state.trade);
	const [ticker, setTicker] = useState<any>(null);

	useEffect(() => {
		const ws = new WebSocket(
			`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`
		);
		ws.onmessage = (e) => {
			const data = JSON.parse(e.data);
			setTicker(data);
		};
		return () => ws.close();
	}, [symbol]);

	const formatPrice = (price: string | number, minimumFractionDigits = 2) =>
		Number(price).toLocaleString('en-US', { minimumFractionDigits });

	const renderLoader = () => (
		<div className='flex items-center justify-center mt-3'>
			<BeatLoader size={5} color='#008000' />
		</div>
	);

	const priceColor =
		Number(ticker?.c) > Number(ticker?.b)
			? 'text-green-500'
			: Number(ticker?.c) < Number(ticker?.b)
			? 'text-deep-orange-500'
			: 'text-blue-gray-100';

	return (
		<div className='fixed top-0 left-0 right-0 bg-white  z-50 py-2'>
			<div className='flex items-center justify-between px-4 '>
				<HiArrowSmLeft
					className='text-2xl text-gray-600 cursor-pointer hover:text-blue-700'
					onClick={() => router.back()}
				/>
				<div className='flex items-center justify-center gap-2'>
					<BiTransferAlt
						className='text-2xl text-green-500 cursor-pointer'
						onClick={() => setOpen(!open)}
					/>
					<h2 className='text-blue-gray-100'>{symbol}</h2>
				</div>
				<div></div>
			</div>
			<div className='flex items-center justify-between px-4 pt-2'>
				{/* Last Price */}
				<div>
					{ticker?.c && ticker.s === symbol ? (
						<div className='space-y-1'>
							<h2 className={`text-2xl md:text-3xl ${priceColor}`}>
								{formatPrice(ticker.c, ticker?.c?.length === 10 ? 6 : 2)}
							</h2>
							<h2 className='text-sm space-x-2'>
								&asymp;{' '}
								<span>
									{Number(ticker?.c).toLocaleString('en-US', {
										style: 'currency',
										currency: 'USD',
									})}
								</span>
								<span
									className={
										Number(ticker?.P) > 0
											? 'text-green-500'
											: 'text-deep-orange-500'
									}
								>
									{ticker?.P}%
								</span>
							</h2>
						</div>
					) : (
						renderLoader()
					)}
				</div>

				{/* 24h High / Low */}
				<div className='flex flex-row items-center gap-x-6 text-xs md:gap-6'>
					<div className='space-y-1 md:space-y-2'>
						<p className='text-blue-gray-300'>24h High</p>
						{ticker?.h && ticker.s === symbol ? (
							<p className='text-gray-800 font-bold'>{formatPrice(ticker.h)}</p>
						) : (
							renderLoader()
						)}
					</div>
					<div className='space-y-1 md:space-y-2'>
						<p className=''>24h Low</p>
						{ticker?.l && ticker.s === symbol ? (
							<p className='text-gray-800 font-bold'>{formatPrice(ticker.l)}</p>
						) : (
							renderLoader()
						)}
					</div>
				</div>
			</div>
			{/* Start Trade Duration */}
			<div className='mt-1'>
				{isLiveTrade ? <LiveTradeDuration /> : <TradeDuration />}
			</div>
			{/* End Trade Duration */}
			<SymbolDrawer open={open} setOpen={setOpen} />
		</div>
	);
};

export default TradeHeader;
