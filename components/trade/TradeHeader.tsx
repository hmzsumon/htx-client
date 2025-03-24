'use client';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import { BiTransferAlt } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { HiArrowSmLeft } from 'react-icons/hi';
import { HistoryIcon } from '@/global/icons/CommonIcons';

import { useMyTradesQuery } from '@/redux/features/trade/tradeApi';
import { useTickerContext } from '@/TickerContext';
import { useRouter } from 'next/navigation';

const TradeHeader = ({ setOpen, open }: any) => {
	const { ticker } = useTickerContext();
	// console.log(ticker);
	const [openDialog, setOpenDialog] = useState(false);
	const handleOpen = () => setOpenDialog(!openDialog);
	const { data, refetch, isError, isLoading, isSuccess, error } =
		useMyTradesQuery(undefined);
	const { trades } = data || [];
	const { symbol } = useSelector((state: any) => state.trade);

	const router = useRouter();

	useEffect(() => {
		if (isError) {
			toast.error((error as fetchBaseQueryError).data.message);
		}

		if (isSuccess) {
			console.log(trades);
		}
	}, [isError, isSuccess]);

	// handle refetch
	const handleRefetch = () => {
		refetch();
		handleOpen();
	};

	return (
		<div className=' bg-black_2 py-2'>
			<div className=' flex items-center justify-between px-4 mb-4'>
				<div>
					<HiArrowSmLeft
						className='text-2xl text-gray-300 cursor-pointer hover:text-blue-700'
						onClick={() => router.back()}
					/>
				</div>
				<div className='flex items-center justify-center gap-2'>
					<BiTransferAlt
						className='text-2xl text-green-500 cursor-pointer '
						onClick={() => setOpen(!open)}
					/>
					<h2 className=' text-blue-gray-100'>{symbol}</h2>
				</div>
				<div>
					<span onClick={handleRefetch} className='cursor-pointer'>
						<HistoryIcon h={6} w={6} color={'#008000'} />
					</span>
				</div>
			</div>
			<div className='flex items-center justify-between px-4 '>
				<div>
					<p className='my-2 text-xs '>Last Price</p>
					{ticker?.c && ticker.s === symbol ? (
						<div className='space-y-1 '>
							<h2
								className={`text-2xl md:text-3xl ${
									Number(ticker?.c) > Number(ticker?.b)
										? 'text-green-500'
										: Number(ticker?.c) < Number(ticker?.b)
										? 'text-deep-orange-500'
										: 'text-blue-gray-100'
								}`}
							>
								<span>
									{ticker?.c?.length === 10
										? Number(ticker?.c).toLocaleString('en-US', {
												minimumFractionDigits: 6,
										  })
										: Number(ticker?.c).toLocaleString('en-US', {
												minimumFractionDigits: 2,
										  })}
								</span>
							</h2>
							<h2 className={`text-sm space-x-2`}>
								&asymp;{' '}
								<span>
									{Number(ticker?.c).toLocaleString('en-US', {
										style: 'currency',
										currency: 'USD',
									})}
								</span>
								<span
									className={` ${
										Number(ticker?.P) > 0
											? 'text-green-500'
											: 'text-deep-orange-500'
									}`}
								>
									{ticker?.P}%
								</span>
							</h2>
						</div>
					) : (
						<div className=' flex items-center justify-center mt-3'>
							<BeatLoader size={5} color={'#008000'} />
						</div>
					)}
				</div>
				<div className='flex flex-col md:flex-row items-center gap-1 text-xs md:gap-6 '>
					<div className='space-y-1 md:space-y-2 '>
						<p className=' text-blue-gray-300'>24h High</p>
						{ticker?.h && ticker.s === symbol ? (
							<p className=' text-blue-gray-100'>
								{Number(ticker?.h).toLocaleString('en-US')}
							</p>
						) : (
							<div className=' flex items-center justify-center mt-3'>
								<BeatLoader size={5} color={'#008000'} />
							</div>
						)}
					</div>
					<div className='space-y-1  md:space-y-2'>
						<p className=' text-blue-gray-300'>24h Low</p>
						{ticker?.l && ticker.s === symbol ? (
							<p className=' text-blue-gray-100'>
								{Number(ticker?.l).toLocaleString('en-US')}
							</p>
						) : (
							<div className='  flex items-center justify-center mt-3'>
								<BeatLoader size={5} color={'#008000'} />
							</div>
						)}
					</div>
				</div>
			</div>
			{/* <Dialog*/}
		</div>
	);
};

export default TradeHeader;
