'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import TradeHistoryCard from './TradeHistoryCard';
import { useGetMyTradeRoundHistoryQuery } from '@/redux/features/trade/tradeApi';
import { ScaleLoader } from 'react-spinners';

const MyAllTradeHistory = () => {
	const { symbol, tradeDuration } = useSelector((state: any) => state.trade);
	const [page, setPage] = useState(1);
	const [records, setRecords] = useState<any[]>([]);
	const [hasMore, setHasMore] = useState(true);

	const { data, isFetching } = useGetMyTradeRoundHistoryQuery(
		{ page, limit: 10 },
		{ skip: !symbol || !tradeDuration }
	);

	const loadMoreRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (data?.trades?.length) {
			setRecords((prev) => [...prev, ...data.trades]);
			if (data.trades.length < 10) {
				setHasMore(false);
			}
		} else {
			setHasMore(false);
		}
	}, [data]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !isFetching && hasMore) {
					setPage((prev) => prev + 1);
				}
			},
			{ threshold: 1 }
		);

		if (loadMoreRef.current) {
			observer.observe(loadMoreRef.current);
		}

		return () => {
			if (loadMoreRef.current) {
				observer.unobserve(loadMoreRef.current);
			}
		};
	}, [loadMoreRef.current, isFetching, hasMore]);

	return (
		<div>
			{records.length > 0 ? (
				<>
					{records.map((record: any, index: number) => (
						<TradeHistoryCard key={index} record={record} />
					))}

					<div ref={loadMoreRef} className='flex justify-center py-4'>
						{isFetching ? (
							<ScaleLoader color='#00b894' height={25} />
						) : !hasMore ? (
							<p className='text-gray-400 text-sm'>No more records</p>
						) : null}
					</div>
				</>
			) : (
				<div className='text-center'>
					<Image
						src='/images/no-data.gif'
						width={200}
						height={200}
						alt='No Data'
						className='mx-auto'
					/>
					<p className='text-gray-500 font-semibold'>No Records found</p>
				</div>
			)}
		</div>
	);
};

export default MyAllTradeHistory;
