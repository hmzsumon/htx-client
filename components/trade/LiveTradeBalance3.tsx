'use client';

import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { formatBalance } from '@/lib/functions';

interface LiveTradeSectionProps {
	initialBalance: number;
}

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

// Helper function to clamp values
const clamp = (num: number, min: number, max: number) =>
	Math.min(Math.max(num, min), max);

const LiveTradeSection: React.FC<LiveTradeSectionProps> = ({
	initialBalance,
}) => {
	const [displayBalance, setDisplayBalance] = useState(initialBalance);
	const [chartData, setChartData] = useState<{ name: string; value: number }[]>(
		[]
	);
	const [glowColor, setGlowColor] = useState('#00C853');
	const [profitPercent, setProfitPercent] = useState(0);
	const [startAngle, setStartAngle] = useState(0); // for rotation

	useEffect(() => {
		const interval = setInterval(() => {
			const randomChange = (Math.random() * 10 - 5).toFixed(2);
			let newBalance = parseFloat(
				(displayBalance + parseFloat(randomChange)).toFixed(2)
			);

			if (newBalance <= 0) return;

			let profitChange = ((newBalance - initialBalance) / initialBalance) * 100;

			// Clamp profitChange between -20% and +40%
			profitChange = clamp(profitChange, -20, 40);

			// Recalculate newBalance based on clamped profitChange
			newBalance = parseFloat(
				(initialBalance * (1 + profitChange / 100)).toFixed(2)
			);

			setDisplayBalance(newBalance);
			setProfitPercent(parseFloat(profitChange.toFixed(2)));

			// Generate fake slices
			const fakeSlices = Array.from({ length: 6 }, (_, index) => ({
				name: `Slice ${index + 1}`,
				value: Math.random() * 20 + 5,
			}));

			fakeSlices.push({ name: 'Live Trade', value: newBalance });
			setChartData(fakeSlices);

			// Glow color based on profit or loss
			setGlowColor(profitChange >= 0 ? '#00C853' : '#FF3D00');

			// Rotate the chart
			setStartAngle((prev) => (prev + 2) % 360);
		}, 1000);

		return () => clearInterval(interval);
	}, [displayBalance, initialBalance]);

	useEffect(() => {
		setDisplayBalance(initialBalance);
		setChartData([{ name: 'Live Trade', value: initialBalance }]);
		setProfitPercent(0);
	}, [initialBalance]);

	return (
		<div className='flex flex-col items-center justify-center w-full relative overflow-hidden px-4 py-6'>
			{/* Background Glow */}
			<div
				className='absolute w-72 h-72 md:w-96 md:h-96 rounded-full blur-3xl opacity-40 animate-spin-slow'
				style={{
					background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
					zIndex: 1,
				}}
			></div>

			{/* Fireworks Animation if profit > 5% */}
			{profitPercent > 5 && (
				<div className='absolute top-0 left-0 w-full h-full z-20 pointer-events-none'>
					<div className='animate-firework absolute left-1/2 top-1/2 w-10 h-10 bg-yellow-400 rounded-full blur-xl opacity-70'></div>
				</div>
			)}

			{/* Donut Chart */}
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
							fill='#8884d8'
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

				{/* Center Balance Info */}
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
					<h2 className='text-2xl md:text-3xl font-bold text-gray-800'>
						{formatBalance(displayBalance)}$
					</h2>
					<p className='text-sm text-gray-500'>Live Balance</p>
					<p
						className={`text-md mt-1 font-semibold ${
							profitPercent >= 0 ? 'text-green-500' : 'text-red-500'
						}`}
					>
						{profitPercent >= 0 ? '+' : ''}
						{profitPercent}%
					</p>
				</div>
			</div>
		</div>
	);
};

export default LiveTradeSection;
