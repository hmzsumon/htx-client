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

const RestPassword = () => {
	const dispatch = useDispatch();
	const { email } = useSelector((state: any) => state.resetPass);
	const router = useRouter();
	// check if email is in the store
	// useEffect(() => {
	// 	if (!email) {
	// 		router.push('/forgot-password');
	// 	}
	// }, [email]);

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
		<div className='px-4 py-6'>
			<div className=' md:w-6/12 mx-auto'>
				<Card className='w-full p-4'>
					<h2 className=' text-htx-blue font-semibold text-center'>
						Reset Your Password
					</h2>
					<form className='flex flex-col gap-4' onSubmit={handleSubmit}>
						{/* Start Password */}
						<div>
							<div className='mb-2 block'>
								<Label
									htmlFor='email1'
									className='text-gray-800 text-sm font-semibold ml-1'
								>
									Enter your new password
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
							<ul
								className={`
							list-none text-xs ${passwordError ? 'text-red-500' : 'text-gray-800'}
							`}
							>
								<li
									className={`flex items-center gap-2 ${
										passwordCriteria.minLength ? 'text-green-500' : ''
									}`}
								>
									{passwordCriteria.minLength ? (
										<FaCheckCircle />
									) : (
										<FaTimesCircle />
									)}
									Between 8-15 characters
								</li>
								<li
									className={`flex items-center gap-2 ${
										passwordCriteria.upperAndLowerCase
											? 'text-green-500'
											: 'text-danger'
									}`}
								>
									{passwordCriteria.upperAndLowerCase ? (
										<FaCheckCircle />
									) : (
										<FaTimesCircle />
									)}
									At least one upper and one lower case letter
								</li>
								<li
									className={`flex items-center gap-2 ${
										passwordCriteria.number ? 'text-green-500' : 'text-danger'
									}`}
								>
									{passwordCriteria.number ? (
										<FaCheckCircle />
									) : (
										<FaTimesCircle />
									)}
									At least one number
								</li>
								<li
									className={`flex items-center gap-2 ${
										passwordCriteria.specialChar
											? 'text-green-500'
											: 'text-danger'
									}`}
								>
									{passwordCriteria.specialChar ? (
										<FaCheckCircle />
									) : (
										<FaTimesCircle />
									)}
									At least one special character
								</li>
							</ul>
						</div>
						{/* End Password */}

						{/* Start Confirm password */}
						<div>
							<div className='mb-2 block'>
								<Label
									htmlFor='password2'
									color={passwordError ? 'failure' : ''}
									className='text-gray-800 text-sm font-semibold ml-1'
								>
									Confirm your password
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
								{isLoading ? (
									<PulseLoader color='#fff' size={8} margin={2} />
								) : (
									'Submit'
								)}
							</Button>
						</div>
					</form>
				</Card>
			</div>
		</div>
	);
};

export default RestPassword;
