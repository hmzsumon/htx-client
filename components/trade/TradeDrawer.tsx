'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import PulseLoader from 'react-spinners/PulseLoader';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import ActiveRound from './ActiveRound';
import { CirclePlus } from 'lucide-react';
import { formatBalance } from '@/lib/functions';
import { useDispatch, useSelector } from 'react-redux';
import { setTradeDrawerOpen } from '@/redux/features/trade/tradeSlice';
import { usePlacePredictionMutation } from '@/redux/features/trade/tradeApi';
import Link from 'next/link';
import classNames from 'classnames';

const TradeDrawer = () => {
	const dispatch = useDispatch();
	const { isTradeDrawerOpen } = useSelector((state: any) => state.trade);
	const { symbol, currentRounds, predict, tradeDuration } = useSelector(
		(state: any) => state.trade
	);

	const activeRound = currentRounds[tradeDuration]?.[symbol];
	const handleClose = () => {
		dispatch(setTradeDrawerOpen(false));
	};
	const [placePrediction, { isLoading }] = usePlacePredictionMutation();
	const { user } = useSelector((state: any) => state.auth);

	const [amount, setAmount] = useState('');
	const [amountError, setAmountError] = useState('');

	// ✅ Input validation logic
	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setAmount(val);

		const parsed = parseFloat(val);

		if (!val || isNaN(parsed)) {
			setAmountError('Please enter a valid amount');
		} else if (parsed <= 0) {
			setAmountError('Amount must be greater than 0');
		} else if (parsed < 0.1) {
			setAmountError('Minimum amount is 0.1 USDT');
		} else if (parsed > user.m_balance) {
			setAmountError('Insufficient balance');
		} else {
			setAmountError('');
		}
	};

	const handleAllAmount = () => {
		if (user?.m_balance >= 0.1) {
			setAmount(user?.m_balance.toString());
			setAmountError('');
		} else {
			setAmount('');
			setAmountError('Insufficient balance to use');
		}
	};

	const handleConfirmPurchase = async () => {
		const parsedAmount = parseFloat(amount);

		if (!amount || isNaN(parsedAmount) || parsedAmount < 0.1) {
			setAmountError('Minimum amount is 0.1 USDT');
			return;
		}
		if (parsedAmount > user.m_balance) {
			setAmountError('Insufficient balance');
			return;
		}

		const body = {
			body: {
				trade_id: activeRound?.trade_id,
				symbol,
				issue_id: activeRound?.issueId,
				buy_price: activeRound?.buyPrice,
				time_period: activeRound?.timePeriod,
				trade_type: predict,
				amount: parsedAmount,
			},
		};

		try {
			await placePrediction(body).unwrap();
			toast.success('Prediction placed successfully');
			handleClose();
			setAmount('');
			setAmountError('');
		} catch (error: any) {
			toast.error(error?.data?.message || 'Something went wrong');
		}
	};

	return (
		<Drawer open={isTradeDrawerOpen} onOpenChange={handleClose}>
			<DrawerContent className='max-h-[85vh] rounded-t-3xl drawer-wrapper py-3'>
				<div>
					<DrawerHeader>
						<DrawerTitle className='text-lg font-bold text-gray-700'>
							<p>{symbol}</p>
						</DrawerTitle>
						<ActiveRound />
					</DrawerHeader>

					<div className='px-4 space-y-4'>
						{/* Buy Side Selector */}
						<div className='text-sm flex gap-2 justify-between items-center'>
							<span>Select:</span>
							<span
								className={`font-semibold ${
									predict === 'Up' ? 'text-green-500' : 'text-red-500'
								}`}
							>
								Buy {predict}
							</span>
						</div>

						{/* Currency Selector */}
						<div className='text-sm flex gap-2 justify-between items-center'>
							<span>Currency:</span>
							<span>USDT</span>
						</div>

						{/* Available Balance */}
						<div className='flex gap-2 items-center text-sm text-gray-500'>
							<p>Available:</p>
							<div className='flex items-center gap-2'>
								<span className='text-green-600 font-semibold'>
									{formatBalance(user?.m_balance)} USDT
								</span>
								<Link href='/deposit'>
									<CirclePlus
										size={18}
										className='text-htx-blue cursor-pointer'
									/>
								</Link>
							</div>
						</div>

						{/* Amount Input with validation */}
						<div className='flex flex-col gap-1'>
							<div className='relative'>
								<Input
									type='number'
									placeholder='Enter the amount'
									value={amount}
									onChange={handleAmountChange}
									className={classNames(
										'w-full placeholder:text-sm',
										amountError ? 'border border-red-500' : ''
									)}
								/>
								<span
									className='text-sm absolute top-[25%] right-8 text-gray-500 cursor-pointer'
									onClick={handleAllAmount}
								>
									All
								</span>
							</div>
							{amountError && (
								<p className='text-xs font-semibold text-red-500 ml-1'>
									{amountError}
								</p>
							)}
						</div>

						{/* Confirm Button */}
						<Button
							className='w-full bg-htx-blue font-bold text-white hover:bg-blue-600'
							disabled={
								!amount || !!amountError || isLoading || !user?.is_active
							}
							onClick={handleConfirmPurchase}
						>
							Confirm purchase
						</Button>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
};

export default TradeDrawer;
