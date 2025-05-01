'use client';

import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { formatBalance } from '@/lib/functions';

interface LiveTradeDonutChartProps {
	initialBalance: number;
}

const COLORS = ['#00C853', '#FF3D00', '#FFD600', '#2979FF', '#546E7A']; // সুন্দর কালারস

const LiveTradeDonutChart: React.FC<LiveTradeDonutChartProps> = ({
	initialBalance,
}) => {
	const [chartData, setChartData] = useState([
		{ name: 'Live Trade', value: initialBalance },
	]);

	return (
		<div className='flex flex-col items-center justify-center w-full h-full relative'>
			<div className='w-full h-64 md:h-80'>
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

				{/* Center Balance */}
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
					<h2 className='text-xl md:text-2xl font-bold text-gray-700'>
						{formatBalance(initialBalance)}$
					</h2>
					<p className='text-xs text-gray-500'>Live Balance</p>
				</div>
			</div>
		</div>
	);
};

export default LiveTradeDonutChart;
