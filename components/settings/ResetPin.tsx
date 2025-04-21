'use client';
import React, { use, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import PulseLoader from 'react-spinners/PulseLoader';

import {
	useCheckOldPinMutation,
	useResetPasswordMutation,
	useSendNewPinEmailMutation,
	useUpdatePinMutation,
} from '@/redux/features/auth/authApi';
import { removeEmail } from '@/redux/resetPassSlice';
import {
	FaCheckCircle,
	FaTimesCircle,
	FaCircle,
	FaEyeSlash,
	FaEye,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { set } from 'react-hook-form';

const ResetPin = () => {
	const router = useRouter();
	const { user } = useSelector((state: any) => state.auth);

	const [oldPin, setOldPin] = useState('');
	const [oldPinError, setOldPinError] = useState(false);
	const [oldPinErrorText, setOldPinErrorText] = useState('');
	const [isOldPinChecked, setIsOldPinChecked] = useState(false);

	const [newPin, setNewPin] = useState('');
	const [newPinError, setNewPinError] = useState(false);
	const [newPinErrorText, setNewPinErrorText] = useState('');
	const [confirmPin, setConfirmPin] = useState('');
	const [confirmPinError, setConfirmPinError] = useState(false);
	const [confirmPinErrorText, setConfirmPinErrorText] = useState('');

	// send new pin email
	const [
		sendNewPinEmail,
		{
			isLoading: isLoadingSendNewPinEmail,
			isSuccess: sentIsSuccess,
			isError: sentIserror,
			error: sentError,
		},
	] = useSendNewPinEmailMutation();

	// handle send new pin email
	const handleSendNewPinEmail = () => {
		const data = {
			email: user?.email,
		};
		sendNewPinEmail(data);
	};

	useEffect(() => {
		if (sentIsSuccess) {
			toast.success('New pin sent successfully');
			router.push('/dashboard');
		}
		if (sentIserror) {
			toast.error((sentError as fetchBaseQueryError).data?.message);
		}
	}, [sentIsSuccess, sentIserror, sentError]);

	const [
		checkOldPin,
		{
			isLoading: isLoadingOldPin,
			isSuccess: isSuccessOldPin,
			isError: isErrorOldPin,
			error: errorOldPin,
		},
	] = useCheckOldPinMutation();

	//handle old pin check
	const handleOldPinCheck = () => {
		const data = {
			oldPassCode: oldPin,
		};
		checkOldPin(data);
	};

	// useEffect to handle success and error
	useEffect(() => {
		if (isSuccessOldPin) {
			setIsOldPinChecked(true);
			toast.success('Old pin is correct');
			setOldPinError(false);
			setOldPinErrorText('');
		}

		if (isErrorOldPin) {
			setIsOldPinChecked(false);
			toast.error((errorOldPin as fetchBaseQueryError).data?.message);
			setOldPinError(true);
			setOldPinErrorText('Old pin is incorrect');
		}
	}, [isSuccessOldPin, isErrorOldPin, errorOldPin]);

	// call reset password api
	const [updatePin, { isLoading, isSuccess, isError, error }] =
		useUpdatePinMutation();

	// handle old pin change
	const handleOldPinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		// Only allow digits and max 6 characters
		if (/^\d{0,6}$/.test(value)) {
			setOldPin(value);

			if (value.length < 6) {
				setOldPinError(true);
				setOldPinErrorText('PIN must be exactly 6 digits');
			} else {
				setOldPinError(false);
				setOldPinErrorText('');
			}
		}
	};

	// ✅ Blur Handler
	const handleOldPinBlur = () => {
		if (oldPin.length !== 6) {
			setOldPinError(true);
			setOldPinErrorText('PIN must be exactly 6 digits');
		} else {
			setOldPinError(false);
			setOldPinErrorText('');
			handleOldPinCheck(); // check from server
		}
	};

	// handle new pin change
	const handleNewPinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (/^\d{0,6}$/.test(value)) {
			setNewPin(value);

			if (value.length < 6) {
				setNewPinError(true);
				setNewPinErrorText('PIN must be exactly 6 digits');
			} else {
				setNewPinError(false);
				setNewPinErrorText('');
			}
		}
	};

	// handle newpin blur
	const handleNewPinBlur = () => {
		if (newPin.length !== 6) {
			setNewPinError(true);
			setNewPinErrorText('PIN must be exactly 6 digits');
		} else {
			setNewPinError(false);
			setNewPinErrorText('');
		}
	};

	// handle form submit
	const handleSubmit = (e: any) => {
		e.preventDefault();
		const data = {
			passCode: newPin,
		};

		updatePin(data);
	};

	// handle confirm pin change
	const handleConfirmPinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setConfirmPin(value);

		if (confirmPin !== newPin) {
			setConfirmPinError(true);
			setConfirmPinErrorText('PIN must be exactly 6 digits');
		} else {
			setConfirmPinError(false);
			setConfirmPinErrorText('');
		}
	};

	// handle confirm pin blur
	const handleConfirmPinBlur = () => {
		if (confirmPin !== newPin) {
			setConfirmPinError(true);
			setConfirmPinErrorText('Pin does not match');
		} else {
			setConfirmPinError(false);
			setConfirmPinErrorText('');
		}
	};

	// useEffect to handle success and error
	useEffect(() => {
		if (isSuccess) {
			toast.success('Pin updated successfully');
			router.push('/dashboard');
		}

		if (isError) {
			toast.error((error as fetchBaseQueryError).data?.message);
		}
	}, [isSuccess, isError, error]);
	return (
		<div className='py-6'>
			<div className=' w-full mx-auto'>
				<Card className='w-full p-4 bg-stone-100'>
					<h2 className=' text-htx-blue font-semibold text-center my-2'>
						Reset Your Pin
					</h2>
					<form className='flex flex-col gap-1' onSubmit={handleSubmit}>
						{/* Start Old Pin */}
						<div>
							<div className='mb-2 block'>
								<Label
									htmlFor='oldPin'
									className='text-gray-800 text-sm font-semibold ml-1'
								>
									Enter your old pin
								</Label>
							</div>
							<div className='mb-2 block relative'>
								<Input
									id='oldPin'
									type='text'
									required
									color={oldPinError ? 'failure' : ''}
									value={oldPin}
									onChange={handleOldPinChange}
									onBlur={handleOldPinBlur}
									className='w-full px-3 py-2 border rounded-md text-xs mt-1 placeholder:text-xs'
								/>
								{oldPinError && (
									<span className='text-xs text-red-500 font-bold ml-1 mt-1'>
										{oldPinErrorText}
									</span>
								)}
							</div>
						</div>
						{/* End Old Pin */}

						{/* Start Pin*/}
						<div>
							<div className='mb-2 block'>
								<Label
									htmlFor='email1'
									className='text-gray-800 text-sm font-semibold ml-1'
								>
									Enter your new pin
								</Label>
							</div>
							<div className='mb-2 block relative'>
								<Input
									id='password1'
									type='text'
									required
									value={newPin}
									onChange={handleNewPinChange}
									onBlur={handleNewPinBlur}
									className={`w-full px-3 py-2 border rounded-md text-xs mt-1 placeholder:text-xs ${
										newPinError ? 'border-red-500' : ' '
									}`}
								/>
								{newPinError && (
									<span className='text-xs text-red-500 font-bold ml-1 mt-1'>
										{newPinErrorText}
									</span>
								)}
							</div>
						</div>
						{/* End Pin */}

						{/* Start Confirm pin */}
						<div>
							<div className='mb-2 block'>
								<Label
									htmlFor='password2'
									color={confirmPinError ? 'failure' : ''}
									className='text-gray-800 text-sm font-semibold ml-1'
								>
									Confirm your pin
								</Label>
							</div>
							<div className='mb-2 block relative'>
								<Input
									id='password2'
									type='text'
									required
									color={confirmPinError ? 'failure' : ''}
									value={confirmPin}
									onChange={(e) => handleConfirmPinChange(e)}
									onBlur={handleConfirmPinBlur}
									className={`w-full px-3 py-2 border rounded-md text-xs mt-1 placeholder:text-xs ${
										confirmPinError ? 'border-red-500' : ' '
									}`}
								/>
								{confirmPinError && (
									<span className='text-xs text-red-500 font-bold ml-1 mt-1'>
										{confirmPinErrorText}
									</span>
								)}
							</div>
						</div>
						{/* End Confirm password */}

						<div className='gap-4'>
							<Button
								type='submit'
								className='w-full bg-htx-blue hover:bg-blue-700'
								disabled={
									isLoading ||
									isLoadingOldPin ||
									oldPinError ||
									newPinError ||
									confirmPinError ||
									!isOldPinChecked
								}
							>
								Submit
							</Button>
						</div>
						<span className='text-xs text-gray-800 ml-1'>
							Forgot your Pin?{' '}
							<span
								className='text-htx-blue font-bold underline cursor-pointer'
								onClick={handleSendNewPinEmail}
							>
								Click here
							</span>{' '}
							to Reset Now.
						</span>
					</form>
				</Card>
			</div>
		</div>
	);
};

export default ResetPin;
