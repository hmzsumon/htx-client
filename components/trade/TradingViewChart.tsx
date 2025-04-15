'use client';
import { useEffect, useRef } from 'react';
import { createChart, UTCTimestamp } from 'lightweight-charts';
import { useSelector } from 'react-redux';

const TradingViewChart = () => {
	const chartContainerRef = useRef<HTMLDivElement | null>(null);
	const chartRef = useRef<any>(null);
	const { symbol } = useSelector((state: any) => state.trade);

	useEffect(() => {
		if (!chartContainerRef.current) return;

		const chart = createChart(chartContainerRef.current, {
			width: chartContainerRef.current.clientWidth,
			height: 400,
			layout: {
				background: { color: '#ffffff' },
				textColor: '#c2bcbc', // Set the time color to red
			},
			grid: {
				vertLines: { color: '#eee' },
				horzLines: { color: '#eee' },
			},
			timeScale: {
				timeVisible: true,
				secondsVisible: false,
				barSpacing: 25,
				tickMarkFormatter: (time: any) => {
					const date = new Date(time * 1000);
					const hours = String(date.getHours()).padStart(2, '0');
					const minutes = String(date.getMinutes()).padStart(2, '0');
					return `${hours}:${minutes}`;
				},
				borderColor: '#f2f0f0', // Set the bottom border color to black
			},
			rightPriceScale: {
				borderColor: '#f2f0f0',
			},
			crosshair: {
				horzLine: { color: '#888', style: 1, visible: true },
				vertLine: { color: '#888', style: 1, visible: true },
			},
		});

		chartRef.current = chart;

		const candleSeries = chart.addCandlestickSeries({
			upColor: '#26a69a',
			downColor: '#ef5350',
			borderUpColor: '#26a69a',
			borderDownColor: '#ef5350',
			wickUpColor: '#26a69a',
			wickDownColor: '#ef5350',
		});

		let latestTime = 0;

		const fetchInitialData = async () => {
			const res = await fetch(
				`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1m`
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
		};

		const fetchNewCandle = async () => {
			const res = await fetch(
				`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1m`
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

			if (newCandle.time > latestTime) {
				candleSeries.update(newCandle);
				latestTime = newCandle.time;
			}
		};

		fetchInitialData();
		const interval = setInterval(fetchNewCandle, 5000);

		// ResizeObserver for full responsiveness
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
	}, []);

	return <div ref={chartContainerRef} className='w-full h-[400px]' />;
};

export default TradingViewChart;
