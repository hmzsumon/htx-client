'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FreeSpinDialog } from '@/components/dashboard/FreeSpinDialog';
import SpinDeposit from '@/public/images/icons/spin_deposit.png';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useGetMySpinPrizeQuery } from '@/redux/features/auth/authApi';

const FreeSpinPage = () => {
	const { user } = useSelector((state: any) => state.auth);
	const [showDialog, setShowDialog] = useState(false);
	const { data } = useGetMySpinPrizeQuery(undefined);
	const { spinPrize } = data || {};
	console.log('spinPrize', spinPrize);
	useEffect(() => {
		if (user?.is_free_spin) setShowDialog(true); // Auto open dialog when this page loads
	}, [user]);

	return (
		<div className='min-h-[85.5vh] bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white flex flex-col items-center justify-start py-10 px-4'>
			<div className='w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl'>
				<div className='flex items-center justify-between mb-4'>
					<div className='flex items-center gap-3'>
						<Image src={SpinDeposit} alt='Spin Icon' width={40} height={40} />
						<h1 className='text-xl font-bold text-white'>
							Free Spin on Deposit
						</h1>
					</div>
				</div>

				<p className='text-sm text-white/80 mb-6'>
					You've unlocked a free spin for making a successful deposit! 🎉 Try
					your luck to win exciting rewards. Click below to spin the wheel.
				</p>

				<div className='text-center'>
					{spinPrize?.status === 'completed' ? (
						<p className='text-xl font-bold text-green-400'>
							🎉 You won: {spinPrize.amount}$
						</p>
					) : (
						<Button
							className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold text-lg px-6 py-3 rounded-full shadow-md'
							onClick={() => setShowDialog(true)}
							disabled={user?.is_free_spin === false}
						>
							🎯 Spin Now
						</Button>
					)}
				</div>

				{showDialog && (
					<FreeSpinDialog
						forcePrize={spinPrize?.prize || '1$'}
						spainId={spinPrize?._id}
					/>
				)}
			</div>
		</div>
	);
};

export default FreeSpinPage;
