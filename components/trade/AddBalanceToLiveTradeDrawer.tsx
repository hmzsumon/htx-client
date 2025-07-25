'use client';
import React, { useEffect, useState } from 'react';
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
import { CirclePlus } from 'lucide-react';
import { formatBalance } from '@/lib/functions';
import { useSelector } from 'react-redux';
import { useBalanceTransferMutation } from '@/redux/features/send/sendApi';
import { useAddBalanceToLiveTradeMutation } from '@/redux/features/trade/tradeApi';

interface DrawerProps {
	isLiveAddBalanceDrawerOpen: boolean;
	setIsLiveAddBalanceDrawerOpen: (open: boolean) => void;
	setIsAddedButtonActive: (active: boolean) => void;
}

const AddBalanceToLiveTradeDrawer = ({
	isLiveAddBalanceDrawerOpen,
	setIsLiveAddBalanceDrawerOpen,
	setIsAddedButtonActive,
}: DrawerProps) => {
	// call the add balance to live trade mutation
	const [addBalanceToLiveTrade, { isLoading, isError, isSuccess, error }] =
		useAddBalanceToLiveTradeMutation();

	const { symbol, currentRounds, predict, tradeDuration } = useSelector(
		(state: any) => state.trade
	);
	const { user } = useSelector((state: any) => state.auth);

	const [amount, setAmount] = useState('');

	const handleClose = () => {
		setIsLiveAddBalanceDrawerOpen(false);
		setAmount('');
	};

	// ✅ validate the amount
	const validateAmount = (amountStr: string) => {
		const numericAmount = parseFloat(amountStr);

		if (!amountStr) {
			toast.error('Please enter an amount');
			return false;
		}
		if (isNaN(numericAmount)) {
			toast.error('Invalid amount');
			return false;
		}
		if (numericAmount <= 0) {
			toast.error('Amount must be positive');
			return false;
		}
		if (numericAmount < 5) {
			toast.error('Minimum amount is 5 USDT');
			return false;
		}
		if (numericAmount > user.m_balance) {
			toast.error('Insufficient balance');
			return false;
		}

		return true;
	};

	// handle amount input
	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;

		// Negative বা non-numeric input ব্লক করবো
		if (inputValue.startsWith('-')) return;

		setAmount(inputValue);
	};

	// handle all balance
	const handleAllAmount = () => {
		if (user.m_balance > 0) {
			setAmount(user.m_balance.toString());
		} else {
			toast.error('You have no balance to use');
		}
	};

	// confirm purchase
	const handleConfirmPurchase = async () => {
		if (!validateAmount(amount)) {
			return;
		}

		const body = {
			amount: Number(amount),
		};

		await addBalanceToLiveTrade(body);
	};

	// handle success and error
	useEffect(() => {
		if (isSuccess) {
			toast.success('Transfer successful');
			// localStorage.removeItem('isAddedButtonActive')
			setIsAddedButtonActive(false);
			localStorage.removeItem('isAddedButtonActive');
			handleClose();
		}
		if (isError) {
			toast.error(
				(error as fetchBaseQueryError).data?.message || 'Something went wrong'
			);
		}
	}, [isSuccess, isError, error]);

	return (
		<Drawer open={isLiveAddBalanceDrawerOpen} onOpenChange={handleClose}>
			<DrawerContent
				className='max-h-[85vh] rounded-t-3xl drawer-wrapper py-3'
				aria-describedby='trade-drawer-desc'
			>
				<div>
					<DrawerHeader>
						<DrawerTitle className='text-lg font-bold text-gray-700'>
							<p>{symbol}</p>
						</DrawerTitle>
					</DrawerHeader>

					<div className='px-4 space-y-4'>
						{/* Currency Section */}
						<div className='text-sm flex gap-2 justify-between items-center'>
							<span>Currency :</span>
							<span>USDT</span>
						</div>

						{/* Current Package */}
						<div className='text-sm flex gap-2 justify-between items-center'>
							<span>Current Package :</span>
							<span>{user?.current_trade_package || '-'}</span>
						</div>

						{/* Main Balance */}
						<div className='flex gap-2 items-center text-sm text-gray-500'>
							<p>Main Balance :</p>
							<div className='flex items-center gap-2'>
								<span className='text-green-600 font-semibold'>
									{formatBalance(user?.m_balance)} USDT
								</span>
								<span>
									<CirclePlus
										size={18}
										className='text-htx-blue cursor-pointer'
									/>
								</span>
							</div>
						</div>

						{/* Amount Input */}
						<div className='flex items-center justify-between gap-1'>
							<div className='relative flex-1'>
								<Input
									type='number'
									width={'100%'}
									placeholder='Enter the amount'
									value={amount}
									onChange={handleAmountChange}
									className='w-full placeholder:text-sm'
								/>
								<span
									className='text-sm absolute top-[25%] right-8 text-gray-500 cursor-pointer'
									onClick={handleAllAmount}
								>
									All
								</span>
							</div>
							<span className='text-sm'>USDT</span>
						</div>

						{/* Confirm Button */}
						<Button
							className='w-full bg-htx-blue font-bold text-white hover:bg-blue-600'
							disabled={!amount}
							onClick={handleConfirmPurchase}
						>
							{isLoading ? (
								<PulseLoader color='white' size={10} className='mx-auto' />
							) : (
								'Confirm Transfer'
							)}
						</Button>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
};

export default AddBalanceToLiveTradeDrawer;
