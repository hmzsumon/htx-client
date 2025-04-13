'use client';

import { useEffect, useState } from 'react';

const PriceHeader = () => {
	const [price, setPrice] = useState<number | null>(null);
	const [prevPrice, setPrevPrice] = useState<number | null>(null);
	const [priceColor, setPriceColor] = useState<'green' | 'red' | 'gray'>(
		'gray'
	);
	const [summary, setSummary] = useState<any>(null);

	// Fetch 24hr summary
	useEffect(() => {
		const fetchSummary = async () => {
			const res = await fetch(
				'https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT'
			);
			const data = await res.json();
			setSummary({
				high: parseFloat(data.highPrice),
				low: parseFloat(data.lowPrice),
				volETH: parseFloat(data.volume),
				volUSDT: parseFloat(data.quoteVolume),
				change: parseFloat(data.priceChangePercent),
			});
		};
		fetchSummary();
	}, []);

	// Live price using WebSocket
	useEffect(() => {
		const ws = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade');

		ws.onmessage = (event) => {
			const data = JSON.parse(event.data);
			const currentPrice = parseFloat(data.p);

			if (price !== null) {
				if (currentPrice > price) setPriceColor('green');
				else if (currentPrice < price) setPriceColor('red');
				else setPriceColor('gray');
			}

			setPrevPrice(price);
			setPrice(currentPrice);
		};

		return () => ws.close();
	}, [price]);

	const getColorClass = () => {
		if (priceColor === 'green') return 'text-green-500';
		if (priceColor === 'red') return 'text-red-500';
		return 'text-gray-500';
	};

	return (
		<div className='bg-white shadow p-4 rounded-xl flex justify-between items-center gap-4'>
			<div>
				<h2 className='text-xl font-bold'>ETHUSDT</h2>
				<div
					className={`text-3xl font-semibold transition-all ${getColorClass()}`}
				>
					${price?.toFixed(2)}
				</div>
				<div
					className={`text-sm ${
						summary?.change < 0 ? 'text-red-500' : 'text-green-500'
					}`}
				>
					{summary?.change?.toFixed(2)}%
				</div>
			</div>

			<div className='text-sm space-y-1'>
				<div>
					24h High: <span className='font-semibold'>{summary?.high}</span>
				</div>
				<div>
					24h Low: <span className='font-semibold'>{summary?.low}</span>
				</div>
				<div>
					24h Vol (ETH):{' '}
					<span className='font-semibold'>{summary?.volETH?.toFixed(2)}</span>
				</div>
				<div>
					24h Vol (USDT):{' '}
					<span className='font-semibold'>
						{(summary?.volUSDT / 1e9)?.toFixed(2)}B
					</span>
				</div>
			</div>
		</div>
	);
};

export default PriceHeader;
