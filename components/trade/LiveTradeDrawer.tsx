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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Countdown from './Countdown';
import ActiveRound from './ActiveRound';
import { preconnect } from 'react-dom';
import { CirclePlus } from 'lucide-react';
import { formatBalance } from '@/lib/functions';
import { useDispatch, useSelector } from 'react-redux';
import {
	setLiveTradeDrawerOpen,
	setTradeDrawerOpen,
} from '@/redux/features/trade/tradeSlice';
import {
	useGetActiveTradeRoundBySymbolQuery,
	usePlacePredictionMutation,
} from '@/redux/features/trade/tradeApi';

const LiveTradeDrawer = () => {
	const dispatch = useDispatch();
	const { isLiveTradeDrawerOpen } = useSelector((state: any) => state.trade);

	const { symbol, currentRounds, predict, tradeDuration } = useSelector(
		(state: any) => state.trade
	);

	const activeRound = currentRounds[tradeDuration]?.[symbol];
	// console.log('Active Round:', activeRound);
	const handleClose = () => {
		dispatch(setLiveTradeDrawerOpen(false));
	};
	const [placePrediction, { isLoading, isError, isSuccess, error }] =
		usePlacePredictionMutation();

	const { user } = useSelector((state: any) => state.auth);

	const [amount, setAmount] = useState('');

	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAmount(e.target.value);
	};

	const handleAmountBlur = () => {
		// set user all balance
		setAmount(user.m_balance);
	};

	// handle all amount
	const handleAllAmount = () => {
		// check if amount is empty or not
		if (user.m_balance > 0) {
			setAmount(user.m_balance);
		} else {
			toast.error('You have no balance to use');
		}
	};

	// confirm purchase
	const handleConfirmPurchase = async () => {
		if (!amount) {
			toast.error('Please enter an amount');
			return;
		}
		if (parseFloat(amount) > user.m_balance) {
			toast.error('Insufficient balance');
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
				amount: Number(amount), // ensure number type
			},
		};

		// console.log('Prediction Body:', body);

		try {
			await placePrediction(body).unwrap();
			toast.success('Prediction placed successfully');
			handleClose();
			setAmount('');
		} catch (error: any) {
			toast.error(error?.data?.message || 'Something went wrong');
		}
	};

	return (
		<Drawer open={isLiveTradeDrawerOpen} onOpenChange={handleClose}>
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
						{/* Buy Side Selector */}

						{/* Currency Selector */}
						<div>
							<div className='text-sm flex gap-2 justify-between  items-center'>
								<span>Currency :</span>
								<span>USDT</span>
							</div>
						</div>

						<div>
							<div className='text-sm flex gap-2 justify-between  items-center'>
								<span>Current Package :</span>
								<span>{user?.current_trade_package}</span>
							</div>
						</div>

						{/* Available Balance */}
						<div className='flex gap-2 items-center text-sm text-gray-500'>
							<p>Main Balance :</p>
							<div className='flex items-center gap-2'>
								<span className='text-green-600 font-semibold'>
									{formatBalance(user.m_balance)} USDT
								</span>
								<span>
									<CirclePlus
										size={18}
										className=' text-htx-blue cursor-pointer'
									/>
								</span>
							</div>
						</div>

						{/* Amount Input */}
						<div className='flex items-center justify-between gap-1'>
							<div className=' relative flex-1'>
								<Input
									type='number'
									width={'100%'}
									placeholder='Enter the amount'
									value={amount}
									onChange={(e) => handleAmountChange(e)}
									className='w-full  placeholder:text-sm'
								/>
								<span
									className=' text-sm absolute top-[25%] right-8 text-gray-500 cursor-pointer'
									onClick={() => handleAllAmount()}
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
							Confirm Transfer
						</Button>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
};

export default LiveTradeDrawer;
