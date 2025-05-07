'use client';
import AllTradeHistory from '@/components/trade/AllTradeHistory';
import MyAllTradeHistory from '@/components/trade/MyAllTradeHistory';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { HiArrowSmLeft } from 'react-icons/hi';
import { useSelector } from 'react-redux';

const TradeHistory = () => {
	const router = useRouter();
	const { symbol } = useSelector((state: any) => state.trade);

	const [activeHistory, setActiveHistory] = useState<any>(1);

	// active history handler
	const handleActiveHistory = (id: number) => {
		setActiveHistory(id);
	};
	return (
		<div className='w-full mx-auto  pt-2'>
			<div className='flex items-center justify-between px-2 fixed top-0 bg-white py-2 z-10 w-full'>
				<HiArrowSmLeft
					className='text-2xl text-gray-600 cursor-pointer hover:text-blue-700'
					onClick={() => router.back()}
				/>
				<div className='flex items-center justify-center gap-2'>
					<h2 className='text-gray-800 font-bold'>{symbol}</h2>
				</div>
				<div></div>
			</div>

			<div className='mt-8'>
				<div className='mt-4'>
					<div className='flex text-sm items-center bg-gray-200 justify-between gap-2 text-gray-700 px-2 py-1 '>
						<button
							onClick={() => handleActiveHistory(1)}
							className={`${
								activeHistory === 1 ? 'text-green-500 font-semibold' : ''
							} `}
						>
							Trade Records
						</button>
						<button
							onClick={() => handleActiveHistory(2)}
							className={`${
								activeHistory === 2 ? 'text-green-500 font-semibold' : ''
							} `}
						>
							My Trades Records
						</button>
					</div>
				</div>

				<div>
					{activeHistory === 1 ? (
						<div className=''>
							<AllTradeHistory />
						</div>
					) : (
						<div className=' '>
							<MyAllTradeHistory />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TradeHistory;
