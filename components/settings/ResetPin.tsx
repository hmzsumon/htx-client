'use client';
import React, { use, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import PulseLoader from 'react-spinners/PulseLoader';

import { useResetPasswordMutation } from '@/redux/features/auth/authApi';
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

const ResetPin = () => {
	const dispatch = useDispatch();
	const { email } = useSelector((state: any) => state.resetPass);
	const router = useRouter();

	// call reset password api
	const [resetPassword, { isLoading, isSuccess, isError, error }] =
		useResetPasswordMutation();

	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [passwordCriteria, setPasswordCriteria] = useState({
		minLength: false,
		upperAndLowerCase: false,
		number: false,
		specialChar: false,
	});

	const [passwordError, setPasswordError] = useState(false);
	const [passwordErrorText, setPasswordErrorText] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [passCode, setPassCode] = useState('');
	const [passCodeError, setPassCodeError] = useState(false);

	const updatePasswordCriteria = (pass: any) => {
		const lengthCriteria = pass.length >= 8 && pass.length <= 15;
		const upperAndLowerCaseCriteria = /[A-Z]/.test(pass) && /[a-z]/.test(pass);
		const numberCriteria = /\d/.test(pass);
		const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(pass);

		setPasswordCriteria({
			minLength: lengthCriteria,
			upperAndLowerCase: upperAndLowerCaseCriteria,
			number: numberCriteria,
			specialChar: specialCharCriteria,
		});
	};

	const handlePasswordChange = (e: any) => {
		const newPass = e.target.value;
		setPassword(newPass);
		updatePasswordCriteria(newPass);
	};

	// handle form submit
	const handleSubmit = (e: any) => {
		e.preventDefault();
		const data = {
			email,
			password,
		};

		resetPassword(data);
	};

	// useEffect to handle success and error
	useEffect(() => {
		if (isSuccess) {
			toast.success('Password reset successfully');
			router.push('/login');
			dispatch(removeEmail());
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
									htmlFor='email1'
									className='text-gray-800 text-sm font-semibold ml-1'
								>
									Enter your old pin
								</Label>
							</div>
							<div className='mb-2 block relative'>
								<Input
									id='password1'
									type={showPassword ? 'text' : 'password'}
									required
									color={passwordError ? 'failure' : ''}
									value={password}
									onChange={handlePasswordChange}
									onBlur={() => {
										if (password.length < 8) {
											setPasswordError(true);
											setPasswordErrorText(
												'Password must be at least 8 characters'
											);
										} else {
											setPasswordError(false);
											setPasswordErrorText('');
										}
									}}
									className='w-full px-3 py-2 border rounded-md text-xs mt-1 placeholder:text-xs'
								/>
								<button
									type='button'
									onClick={() => setShowPassword(!showPassword)}
									className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
								>
									{showPassword ? <FaEyeSlash /> : <FaEye />}
								</button>
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
									type={showPassword ? 'text' : 'password'}
									required
									color={passwordError ? 'failure' : ''}
									value={password}
									onChange={handlePasswordChange}
									onBlur={() => {
										if (password.length < 8) {
											setPasswordError(true);
											setPasswordErrorText(
												'Password must be at least 8 characters'
											);
										} else {
											setPasswordError(false);
											setPasswordErrorText('');
										}
									}}
									className='w-full px-3 py-2 border rounded-md text-xs mt-1 placeholder:text-xs'
								/>
								<button
									type='button'
									onClick={() => setShowPassword(!showPassword)}
									className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
								>
									{showPassword ? <FaEyeSlash /> : <FaEye />}
								</button>
							</div>
						</div>
						{/* End Pin */}

						{/* Start Confirm pin */}
						<div>
							<div className='mb-2 block'>
								<Label
									htmlFor='password2'
									color={passwordError ? 'failure' : ''}
									className='text-gray-800 text-sm font-semibold ml-1'
								>
									Confirm your pin
								</Label>
							</div>
							<div className='mb-2 block relative'>
								<Input
									id='password2'
									type={showConfirmPassword ? 'text' : 'password'}
									required
									color={passwordError ? 'failure' : ''}
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									onBlur={() => {
										if (confirmPassword !== password) {
											setPasswordError(true);
											setPasswordErrorText('Passwords do not match');
										} else {
											setPasswordError(false);
											setPasswordErrorText('');
										}
									}}
									className='w-full px-3 py-2 border rounded-md text-xs mt-1 placeholder:text-xs'
								/>
								<button
									type='button'
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
								>
									{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
								</button>
							</div>
							{passwordError && (
								<span className='text-xs text-red-500'>
									{passwordErrorText}
								</span>
							)}
						</div>
						{/* End Confirm password */}

						<div className='gap-4'>
							<Button
								type='submit'
								className='w-full bg-htx-blue hover:bg-blue-700'
							>
								Submit
							</Button>
						</div>
						<span className='text-xs text-gray-800 ml-1'>
							Forgot your Pin?{' '}
							<Link
								href='/settings/reset-pin'
								className='text-htx-blue font-bold underline'
							>
								Click here
							</Link>{' '}
							to Reset Now.
						</span>
					</form>
				</Card>
			</div>
		</div>
	);
};

export default ResetPin;
