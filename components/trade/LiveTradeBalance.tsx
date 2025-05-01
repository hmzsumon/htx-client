'use client';

import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { formatBalance } from '@/lib/functions';
import { useSocket } from '@/context/SocketContext';
import { useSelector } from 'react-redux';

const COLORS = [
	'#00C853',
	'#FF3D00',
	'#FFD600',
	'#2979FF',
	'#546E7A',
	'#00BFA5',
	'#D500F9',
	'#FF6D00',
	'#2962FF',
	'#C51162',
];

const clamp = (num: number, min: number, max: number) =>
	Math.min(Math.max(num, min), max);

const LiveTradeSection = () => {
	const { socket } = useSocket();
	const { user } = useSelector((state: any) => state.auth);

	const [displayBalance, setDisplayBalance] = useState<number>(0);
	const [initialBalance, setInitialBalance] = useState<number>(0);
	const [profitPercent, setProfitPercent] = useState<number>(0);
	const [isForcedLoss, setIsForcedLoss] = useState<boolean>(false);
	const [chartData, setChartData] = useState<{ name: string; value: number }[]>(
		[]
	);
	const [glowColor, setGlowColor] = useState('#00C853');
	const [startAngle, setStartAngle] = useState(0);

	// ✅ Animate chart rotation every 5s
	useEffect(() => {
		const interval = setInterval(() => {
			setStartAngle((prev) => (prev + 15) % 360);
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	// ✅ Listen to live balance updates
	useEffect(() => {
		if (!socket || !user?._id) return;

		const handleBalanceUpdate = (data: {
			userId: string;
			currentBalance: number;
			initialBalance: number;
			profitPercent?: number;
			isForcedLoss?: boolean;
		}) => {
			if (data.userId !== user._id) return;

			const { currentBalance, initialBalance, isForcedLoss = false } = data;

			let profitChange = 0;
			if (initialBalance > 0) {
				profitChange =
					((currentBalance - initialBalance) / initialBalance) * 100;
				if (!isForcedLoss) {
					profitChange = clamp(profitChange, -15, 30);
				}
			}

			setInitialBalance(initialBalance);
			setDisplayBalance(currentBalance);
			setProfitPercent(parseFloat(profitChange.toFixed(2)));
			setIsForcedLoss(isForcedLoss);

			// 🔁 Fix-size chart for all users
			const fixedSlices = Array.from({ length: 6 }, (_, i) => ({
				name: `Slice ${i + 1}`,
				value: 20,
			}));
			fixedSlices.push({ name: 'Live Trade', value: 100 });
			setChartData(fixedSlices);

			setGlowColor(profitChange >= 0 ? '#00C853' : '#FF3D00');
		};

		socket.on('balance_update', handleBalanceUpdate);
		return () => {
			socket.off('balance_update', handleBalanceUpdate);
		};
	}, [socket, user?._id]);

	return (
		<div className='flex flex-col items-center justify-center w-full relative overflow-hidden px-4 py-6'>
			{/* 🔆 Glow Animation */}
			<div
				className='absolute w-72 h-72 md:w-96 md:h-96 rounded-full blur-3xl opacity-40 animate-spin-slow'
				style={{
					background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
					zIndex: 1,
				}}
			></div>

			{/* 🍩 Donut Chart */}
			<div className='w-full h-64 md:h-80 relative z-10'>
				<ResponsiveContainer width='100%' height='100%'>
					<PieChart>
						<Pie
							data={chartData}
							dataKey='value'
							cx='50%'
							cy='50%'
							innerRadius='70%'
							outerRadius='100%'
							paddingAngle={2}
							startAngle={startAngle}
							endAngle={startAngle + 360}
						>
							{chartData.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={COLORS[index % COLORS.length]}
								/>
							))}
						</Pie>
					</PieChart>
				</ResponsiveContainer>

				{/* 🧠 Center Content */}
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center border-2 rounded-lg px-4 py-2'>
					<h2 className='text-2xl md:text-3xl font-bold text-gray-800'>
						{formatBalance(displayBalance)}$
					</h2>
					<p className='text-sm text-gray-500'>Live Balance</p>
					<p
						className={`text-md mt-1 font-semibold ${
							profitPercent >= 0 ? 'text-green-500' : 'text-red-500'
						}`}
					>
						{isNaN(profitPercent)
							? '0%'
							: `${profitPercent >= 0 ? '+' : ''}${profitPercent.toFixed(2)}%`}
					</p>

					{/* ⚠️ Forced Loss Badge */}
					{isForcedLoss && (
						<p className='text-xs mt-1 text-red-600 font-medium animate-pulse'>
							⚠️ Forced Loss
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default LiveTradeSection;
