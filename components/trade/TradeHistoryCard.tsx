'use client';

import { useState } from 'react';

interface TradeHistoryCardProps {
	record: any;
}

const TradeHistoryCardWithDetail = ({ record }: TradeHistoryCardProps) => {
	const [showDetail, setShowDetail] = useState(false);

	const isSuccess = record.status === 'Succeed';
	const resultColor = isSuccess ? 'text-green-600' : 'text-red-500';
	const profitPrefix = isSuccess ? '+' : '-';

	return (
		<div className='border-b py-3 px-4'>
			{/* Summary Header */}
			<div
				className='flex justify-between items-center cursor-pointer'
				onClick={() => setShowDetail(!showDetail)}
			>
				<div className='flex items-center gap-2'>
					<div className='flex-1'>
						<button
							className={`${
								record.trade_type === 'Up'
									? 'bg-green-500'
									: record.trade_type === 'Down'
									? 'bg-red-500'
									: 'bg-gray-500'
							} text-white text-xs rounded  py-1 w-[65px] flex items-center justify-center`}
						>
							{record.trade_type}
						</button>
					</div>
					<div className='text-xs'>
						<p className='font-semibold space-x-2'>
							<span>{record.issue_id}</span>
							<span>({record.time_period})</span>
						</p>
						<p className='text-gray-500 text-xs'>
							{new Date(record.createdAt).toLocaleString()}
						</p>
					</div>
				</div>
				<div className='text-right'>
					<p
						className={`text-xs ${
							!record.profit ? 'text-gray-500' : resultColor
						} font-bold`}
					>
						{record.status}
					</p>
					<p
						className={`${
							!record.profit ? 'text-gray-500' : resultColor
						} text-xs font-bold`}
					>
						{profitPrefix}
						{!record.profit ? '---' : Math.abs(record.profit).toFixed(2)} $
					</p>
				</div>
			</div>

			{/* Details */}
			{showDetail && (
				<div className='bg-gray-50 mt-3 rounded-lg p-3 text-xs space-y-1'>
					<div className='flex justify-between'>
						<span className='text-gray-500'>Round Id</span>
						<span>{record.issue_id}</span>
					</div>

					<div className='flex justify-between'>
						<span className='text-gray-500'>Currency</span>
						<span>{record.symbol}</span>
					</div>

					<div className='flex justify-between'>
						<span className='text-gray-500'>Purchase amount</span>
						<span>${record.amount.toFixed(2)}</span>
					</div>
					<div className='flex justify-between'>
						<span className='text-gray-500'>Amount after Fee</span>
						<span>${(record.amount * 0.98).toFixed(2)}</span>
					</div>
					<div className='flex justify-between'>
						<span className='text-gray-500'>Trade Fee</span>
						<span>${(record.amount * 0.02).toFixed(2)}</span>
					</div>
					<div className='flex justify-between'>
						<span className='text-gray-500'>Result</span>
						<span>{record.result}</span>
					</div>
					<div className='flex justify-between'>
						<span className='text-gray-500'>Select</span>
						<span className='font-medium'>{record.trade_type}</span>
					</div>
					<div className='flex justify-between'>
						<span
							className={`${
								record.status === 'Pending' ? 'text-gray-500' : resultColor
							} `}
						>
							Status
						</span>
						<span className={resultColor}>{record.status}</span>
					</div>
					<div className='flex justify-between'>
						<span className='text-gray-500'>Win/Loss</span>
						<span
							className={`${!record.profit ? 'text-gray-500' : resultColor} `}
						>
							{profitPrefix}
							{!record.profit ? '---' : Math.abs(record.profit).toFixed(2)} $
						</span>
					</div>
					<div className='flex justify-between'>
						<span className='text-gray-500'>Trade time</span>
						<span>
							{new Date(record.createdAt).toLocaleString('en-GB', {
								year: 'numeric',
								month: '2-digit',
								day: '2-digit',
								hour: '2-digit',
								minute: '2-digit',
								second: '2-digit',
							})}
						</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default TradeHistoryCardWithDetail;
