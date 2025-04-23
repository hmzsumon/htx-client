'use client';
import TransactionCard from '@/components/TransactionCard';
import { useGetMyTransferQuery } from '@/redux/features/send/sendApi';
import Image from 'next/image';
import React from 'react';
import toast from 'react-hot-toast';

const TransferHistory = () => {
	const { data, isLoading, isError, isSuccess, error } =
		useGetMyTransferQuery(undefined);
	const { transfers } = data || [];

	return (
		<div className='flex flex-col gap-1 bg-white min-h-[80vh] '>
			{transfers && transfers.length > 0 ? (
				<>
					{transfers.map((transfer: any) => (
						<TransactionCard
							key={transfer._id}
							type='Transfer'
							status={transfer.status}
							amount={transfer.amount}
							currency={transfer.currency}
							method={transfer.method}
							time={transfer.createdAt}
							orderId={transfer._id}
							onCopy={(value: string) => {
								navigator.clipboard.writeText(value);
								toast.success('Copied to clipboard');
							}}
							record={transfer}
						/>
					))}
				</>
			) : (
				<div className='text-center flex items-center justify-center min-h-[80vh]'>
					<div>
						<Image
							src='/images/no-data.gif'
							width={200}
							height={200}
							alt='No Data'
							className='mx-auto'
						/>
						<p className='text-gray-500 text-sm font-semibold'>
							No Records found
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default TransferHistory;
