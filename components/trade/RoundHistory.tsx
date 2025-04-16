'use client';
import React, { use, useEffect } from 'react';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { formatBalance } from '@/lib/functions';
import { useSelector } from 'react-redux';
import {
	useGetTradeRoundHistoryBySymbolQuery,
	useGetTradeRoundHistoryQuery,
} from '@/redux/features/trade/tradeApi';

const RoundHistory = () => {
	const { symbol, tradeDuration } = useSelector((state: any) => state.trade);
	const { data, isLoading, isError, isSuccess, error, refetch } =
		useGetTradeRoundHistoryBySymbolQuery({
			symbol,
			timePeriod: tradeDuration,
			page: 1, // optional, default = 1
			limit: 10, // optional, default = 10
		});
	const { rounds: records } = data || [];

	return (
		<Table className='text-xs '>
			<TableBody>
				{records?.map((record: any, index: number) => (
					<TableRow
						key={index}
						className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
					>
						<TableCell className='text-left flex flex-col gap-1 py-4'>
							<span>{record.issueId}</span>
							<span className='flex items-center gap-1'>
								<span>Buy</span>
								<span className='text-green-500'>
									{formatBalance(record.buyPrice)}
								</span>
							</span>
						</TableCell>
						<TableCell className='text-center '>
							Sell{' '}
							<span className='text-red-500'>
								{formatBalance(record.sellPrice)}
							</span>
						</TableCell>
						<TableCell className=' items-end '>
							<div>
								{' '}
								Result{' '}
								<span
									className={` ${
										record.result === 'Up' ? 'text-green-500' : 'text-red-500'
									} `}
								>
									{record.result}
								</span>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default RoundHistory;
