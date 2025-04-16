'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { formatBalance } from '@/lib/functions';
import { useSelector } from 'react-redux';
import { useGetTradeRoundHistoryBySymbolQuery } from '@/redux/features/trade/tradeApi';
import { ScaleLoader } from 'react-spinners';

const AllTradeHistory = () => {
	const { symbol, tradeDuration } = useSelector((state: any) => state.trade);

	const [page, setPage] = useState(1);
	const [records, setRecords] = useState<any[]>([]);
	const [hasMore, setHasMore] = useState(true);

	const { data, isFetching, isSuccess } = useGetTradeRoundHistoryBySymbolQuery({
		symbol,
		timePeriod: tradeDuration,
		page,
		limit: 10,
	});

	// 👇 IntersectionObserver ref
	const loadMoreRef = useRef<HTMLDivElement | null>(null);

	// 👇 Append new data to existing records
	useEffect(() => {
		if (data?.rounds?.length) {
			setRecords((prev) => [...prev, ...data.rounds]);
			if (data.rounds.length < 10) setHasMore(false); // no more records
		} else {
			setHasMore(false);
		}
	}, [data]);

	// 👇 Reset when symbol or duration changes
	useEffect(() => {
		setPage(1);
		setRecords([]);
		setHasMore(true);
	}, [symbol, tradeDuration]);

	// 👇 Infinite Scroll Observer
	useEffect(() => {
		if (!hasMore) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !isFetching) {
					setPage((prev) => prev + 1);
				}
			},
			{ threshold: 1 }
		);

		if (loadMoreRef.current) observer.observe(loadMoreRef.current);

		return () => {
			if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
		};
	}, [loadMoreRef, isFetching, hasMore]);

	return (
		<>
			<Table className='text-xs'>
				<TableBody>
					{records.map((record, index) => (
						<TableRow
							key={`${record.issueId}-${index}`}
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
							<TableCell className='text-center'>
								Sell{' '}
								<span className='text-red-500'>
									{formatBalance(record.sellPrice)}
								</span>
							</TableCell>
							<TableCell className='items-end'>
								<div>
									Result{' '}
									<span
										className={`${
											record.result === 'Up'
												? 'text-green-500'
												: record.result === 'Down'
												? 'text-red-500'
												: 'text-yellow-500'
										}`}
									>
										{record.result}
									</span>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{/* 👇 Loader or End Message */}
			<div ref={loadMoreRef} className='flex justify-center py-4'>
				{isFetching && hasMore && <ScaleLoader color='#3b82f6' />}
				{!hasMore && <p className='text-gray-400 text-sm'>No more records</p>}
			</div>
		</>
	);
};

export default AllTradeHistory;
