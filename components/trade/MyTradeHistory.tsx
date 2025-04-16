import { useGetMyTradeRoundHistoryQuery } from '@/redux/features/trade/tradeApi';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import TradeHistoryCard from './TradeHistoryCard';

const MyTradeHistory = () => {
	const { symbol, tradeDuration } = useSelector((state: any) => state.trade);
	const { data, isLoading, isError, isSuccess, error, refetch } =
		useGetMyTradeRoundHistoryQuery(undefined);
	const { trades: records } = data || [];

	// filter records by symbol and time period
	const filteredRecords = records?.filter((record: any) => {
		return record.time_period === tradeDuration;
	});
	return (
		<div>
			{filteredRecords?.length > 0 ? (
				<>
					<div>
						{filteredRecords?.map((record: any, index: number) => (
							<TradeHistoryCard key={index} record={record} /> // ✅ use component here
						))}
					</div>
				</>
			) : (
				<div>
					<Image
						src='/images/no-data.gif'
						width={200}
						height={200}
						alt='No Data'
						className='mx-auto'
					/>
					<p className='text-center text-gray-500 font-semibold'>
						No Records found
					</p>
				</div>
			)}
		</div>
	);
};

export default MyTradeHistory;
