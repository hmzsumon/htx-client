'use client';
import { useEffect, useRef } from 'react';
import { createChart, UTCTimestamp } from 'lightweight-charts';
import { useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';

const RealtimeEmulation = ({ kline, time, isLoading, setIsLoading }: any) => {
	const { symbol } = useSelector((state: any) => state.trade);
	const chartContainerRef = useRef<HTMLDivElement | null>(null);
	const chartRef = useRef<any>(null);
	let latestTime = 0;

	useEffect(() => {
		if (!chartContainerRef.current) return;

		const chart = createChart(chartContainerRef.current, {
			width: chartContainerRef.current.clientWidth,
			height: 400,
			layout: {
				background: { color: '#ffffff' },
				textColor: '#c2bcbc',
			},
			grid: {
				vertLines: { color: '#eee' },
				horzLines: { color: '#eee' },
			},
			timeScale: {
				timeVisible: true,
				secondsVisible: false,
				barSpacing: 15,
				borderColor: '#f2f0f0',
				tickMarkFormatter: (time: number) => {
					const date = new Date(time * 1000);
					return `${String(date.getHours()).padStart(2, '0')}:${String(
						date.getMinutes()
					).padStart(2, '0')}`;
				},
			},
			rightPriceScale: {
				borderColor: '#f2f0f0',
			},
			crosshair: {
				horzLine: { color: '#888', style: 1, visible: true },
				vertLine: { color: '#888', style: 1, visible: true },
			},
		});

		const candleSeries = chart.addCandlestickSeries({
			upColor: '#26a69a',
			downColor: '#ef5350',
			borderUpColor: '#26a69a',
			borderDownColor: '#ef5350',
			wickUpColor: '#26a69a',
			wickDownColor: '#ef5350',
		});

		chartRef.current = chart;

		const fetchInitialData = async () => {
			try {
				const res = await fetch(
					`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${time}&limit=100`
				);
				const raw = await res.json();
				const data = raw.map((d: any) => ({
					time: (d[0] / 1000) as UTCTimestamp,
					open: parseFloat(d[1]),
					high: parseFloat(d[2]),
					low: parseFloat(d[3]),
					close: parseFloat(d[4]),
				}));
				candleSeries.setData(data);
				if (data.length) latestTime = data[data.length - 1].time;
				setIsLoading(false);
			} catch (err) {
				console.error('Initial fetch failed:', err);
				setIsLoading(false);
			}
		};

		const fetchNewCandle = async () => {
			try {
				const res = await fetch(
					`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${time}&limit=2`
				);
				const raw = await res.json();
				const d = raw[raw.length - 1];

				const newCandle = {
					time: (d[0] / 1000) as UTCTimestamp,
					open: parseFloat(d[1]),
					high: parseFloat(d[2]),
					low: parseFloat(d[3]),
					close: parseFloat(d[4]),
				};

				const isFlat =
					newCandle.open === newCandle.close &&
					newCandle.open === newCandle.high &&
					newCandle.open === newCandle.low;

				if (newCandle.time > latestTime && !isFlat) {
					candleSeries.update(newCandle);
					latestTime = newCandle.time;
				}
			} catch (err) {
				console.error('Realtime update error:', err);
			}
		};

		fetchInitialData();
		const interval = setInterval(fetchNewCandle, 5000);

		const observer = new ResizeObserver(() => {
			if (chartContainerRef.current) {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth });
			}
		});
		observer.observe(chartContainerRef.current);

		return () => {
			clearInterval(interval);
			observer.disconnect();
			chart.remove();
		};
	}, [symbol, time]);

	return (
		<div ref={chartContainerRef} className='relative w-full h-[400px]'>
			{isLoading && (
				<div className='absolute top-[49%] left-[46%]'>
					<PropagateLoader color='#008000' size={18} />
				</div>
			)}
		</div>
	);
};

export default RealtimeEmulation;
