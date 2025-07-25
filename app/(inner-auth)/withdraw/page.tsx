'use client';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PulseLoader from 'react-spinners/PulseLoader';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Copy } from 'lucide-react';
import { useSelector } from 'react-redux';
import { formatBalance } from '@/lib/functions';
import RechargeInstructions from '@/components/RechargeInstructions';
import { TransferDrawer } from '@/components/transfer/TransferDrawer';
import { useCreateWithdrawRequestMutation } from '@/redux/features/withdraw/withdrawApi';

const WithdrawPage = () => {
	const { user } = useSelector((state: any) => state.auth);
	const [createWithdrawRequest, { isLoading, isError, isSuccess, error }] =
		useCreateWithdrawRequestMutation();

	const withdrawInstructions = [
		// <>
		// 	You must reach a trade volume of{' '}
		// 	<span className='text-red-500 font-bold'>{user?.trade_volume}$</span> to
		// 	be eligible for withdrawal. (This value reflects your personal trade
		// 	volume).
		// </>,

		'Withdrawals are available 24 hours a day.',
		'Withdrawals are typically processed between 1 minute to 24 hours after submission.',
		'Each user has 3 withdrawal attempts per day.',
		'Withdrawal amount must be between $30 to $500,00.',
		'After making a withdrawal, funds require 3 blockchain confirmations.',
		'Ensure your environment is secure.',
		'Check beneficiary address carefully — incorrect info can cause loss.',
	];

	const [amount, setAmount] = useState('');
	const [amountError, setAmountError] = useState(false);
	const [amountErrorMessage, setAmountErrorMessage] = useState('');
	const [withdrawFee, setWithdrawFee] = useState(0);
	const [actualReceipt, setActualReceipt] = useState(0);
	const [withdrawAddress, setWithdrawAddress] = useState('');
	const [network, setNetwork] = useState('trc20');
	const [openDrawer, setOpenDrawer] = useState(false);

	const availableBalance = user?.m_balance;

	const handleNetworkChange = (value: string) => {
		setNetwork(value);
	};

	const handleWithdrawAddressChange = (value: string) => {
		setWithdrawAddress(value);
	};

	const handleAmountChange = (value: string) => {
		const parsed = parseFloat(value);
		setAmount(value);

		if (!value || parsed < 30) {
			setAmountError(true);
			setAmountErrorMessage('Minimum withdrawal amount is 30 USDT');
			return;
		}

		if (parsed > availableBalance) {
			setAmountError(true);
			setAmountErrorMessage('Amount exceeds your available balance');
			return;
		}

		if (parsed <= 0) {
			setAmountError(true);
			setAmountErrorMessage('Amount must be greater than zero');
			return;
		}

		setAmountError(false);
		setAmountErrorMessage('');
		const fee = parsed * 0.06;
		const receipt = parsed - fee;
		setWithdrawFee(fee);
		setActualReceipt(receipt);
	};

	const handleSubmit = () => {
		// Process the withdrawal
		if (amountError || !amount || !withdrawAddress) {
			return;
		}
		if (parseFloat(amount) < 30) {
			setAmountError(true);
			setAmountErrorMessage('Minimum withdrawal amount is 30 USDT');
			return;
		}
		if (parseFloat(amount) > availableBalance) {
			setAmountError(true);
			setAmountErrorMessage('Amount exceeds your available balance');
			return;
		}
		if (parseFloat(amount) <= 0) {
			setAmountError(true);
			setAmountErrorMessage('Amount must be greater than zero');
			return;
		}
		const data = {
			amount: parseFloat(amount),
			withdrawAddress,
			network,
			withdrawFee,
			receiptAmount: actualReceipt,
		};

		createWithdrawRequest(data);
	};

	useEffect(() => {
		if (isError) {
			const errorMessage =
				(error as fetchBaseQueryError).data.message ||
				'Failed to submit withdrawal request';
			toast.error(errorMessage);
		}
		if (isSuccess) {
			toast.success('Withdrawal request submitted successfully!');
			setOpenDrawer(false);
			setAmount('');
			setWithdrawAddress('');
		}
	}, [isError, isSuccess, error]);

	return (
		<div>
			<Card className='md:w-1/2 mx-auto  text-sm  space-y-4 shadow-lg rounded-xl bg-white'>
				<div className='space-y-4 p-4 '>
					<h2 className='font-semibold text-gray-700'>Withdraw network</h2>
					<Select defaultValue='trc20' onValueChange={handleNetworkChange}>
						<SelectTrigger className='w-full'>
							<SelectValue placeholder='Select network' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='trc20'>Tron (TRC20)</SelectItem>
							<SelectItem value='bep20'>BSC (BEP20)</SelectItem>
						</SelectContent>
					</Select>

					<div className='space-y-1'>
						<Label className='ml-1'>Withdrawal address</Label>
						<div className='flex items-center gap-2'>
							<Input
								placeholder='Please select the withdrawal address'
								className='w-full placeholder:text-xs'
								value={withdrawAddress}
								onChange={(e) => handleWithdrawAddressChange(e.target.value)}
							/>
							<Button size='icon' variant='outline'>
								<Copy className='w-4 h-4' />
							</Button>
						</div>
					</div>

					<div className='space-y-1'>
						<Label className='ml-1'>Withdrawal quantity</Label>
						<Input
							placeholder='Minimum input quantity is 30 USDT'
							type='number'
							inputMode='decimal'
							step='0.01'
							min={30}
							max={availableBalance}
							value={amount}
							onInput={(e) =>
								((e.target as HTMLInputElement).value = (
									e.target as HTMLInputElement
								).value.replace(/[^0-9.]/g, ''))
							}
							onChange={(e) => handleAmountChange(e.target.value)}
							className={`placeholder:text-xs ${
								amountError ? 'border-red-500' : ''
							}`}
						/>
						{amountError && (
							<p className='text-xs text-red-500 font-medium mt-1 ml-1'>
								{amountErrorMessage}
							</p>
						)}
						<div className='flex justify-between text-sm text-gray-500 mt-2 ml-1'>
							<span>Available balance:</span>
							<span className='text-green-500'>
								{formatBalance(availableBalance || 0)} USDT
							</span>
						</div>
					</div>

					<div className='text-sm text-gray-600 space-y-1'>
						<div className='flex justify-between'>
							<span>Withdraw fee (6%)</span>
							<span>{formatBalance(withdrawFee || 0)} USDT</span>
						</div>
						<div className='flex justify-between font-semibold'>
							<span>Actual receipt</span>
							<span>{formatBalance(actualReceipt || 0)} USDT</span>
						</div>
					</div>

					<Button
						onClick={() => setOpenDrawer(true)}
						disabled={amountError || !amount || !withdrawAddress}
						className='w-full mt-4 bg-htx-blue hover:bg-blue-700'
					>
						Security verify
					</Button>
				</div>

				<div>
					<RechargeInstructions
						data={withdrawInstructions}
						title='Withdrawal Instructions'
					/>
				</div>
			</Card>
			<TransferDrawer
				open={openDrawer}
				setOpen={setOpenDrawer}
				handleConfirm={handleSubmit}
			/>
		</div>
	);
};

export default WithdrawPage;
