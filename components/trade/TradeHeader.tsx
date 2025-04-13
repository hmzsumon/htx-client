'use client';

import React, { useEffect, useState } from 'react';
import { BiTransferAlt } from 'react-icons/bi';
import { HiArrowSmLeft } from 'react-icons/hi';
import { HistoryIcon } from '@/global/icons/CommonIcons';
import { BeatLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { SymbolDrawer } from './SymbolDrawer';

const TradeHeader = ({ setOpen, open }: any) => {
	const router = useRouter();
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
		<div className='bg-black_2 py-2'>
			<div className='flex items-center justify-between px-4 mb-4'>
				<HiArrowSmLeft
					className='text-2xl text-gray-300 cursor-pointer hover:text-blue-700'
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

			<div className='flex items-center justify-between px-4'>
				{/* Last Price */}
				<div>
					<p className='my-2 text-xs'>Last Price</p>
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
				<div className='flex flex-col md:flex-row items-center gap-1 text-xs md:gap-6'>
					<div className='space-y-1 md:space-y-2'>
						<p className='text-blue-gray-300'>24h High</p>
						{ticker?.h && ticker.s === symbol ? (
							<p className='text-blue-gray-100'>{formatPrice(ticker.h)}</p>
						) : (
							renderLoader()
						)}
					</div>
					<div className='space-y-1 md:space-y-2'>
						<p className='text-blue-gray-300'>24h Low</p>
						{ticker?.l && ticker.s === symbol ? (
							<p className='text-blue-gray-100'>{formatPrice(ticker.l)}</p>
						) : (
							renderLoader()
						)}
					</div>
				</div>
			</div>
			<SymbolDrawer open={open} setOpen={setOpen} />
		</div>
	);
};

export default TradeHeader;
