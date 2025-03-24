'use client';
import React, { use, useEffect, useState } from 'react';

import {
	setActiveStep,
	setCompletedStep,
	handleNext,
	handlePrevious,
	setSecurityData,
} from '@/redux/stepperSlice';

import countries from '@/lib/countries';
import { useSearchParams } from 'next/navigation';
import {
	FaCheckCircle,
	FaTimesCircle,
	FaCircle,
	FaEyeSlash,
	FaEye,
} from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const Security = () => {
	const dispatch = useDispatch();

	// useEffect to set the active step
	useEffect(() => {
		dispatch(setActiveStep(3));
	}, [dispatch]);

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

	// next handler
	const nextHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (
			passwordError ||
			password === '' ||
			confirmPassword !== password ||
			passCodeError
		)
			return;

		dispatch(setSecurityData({ password, passCode }));
		dispatch(setCompletedStep(3));
		dispatch(handleNext());
	};

	// handle set passCode and validate 6 digit passcode
	const handlePassCode = (e: any) => {
		const pass = e.target.value;
		// Ensure only digits are entered
		if (/^\d{0,6}$/.test(pass)) {
			setPassCode(pass);
			setPassCodeError(false);
		} else {
			setPassCodeError(true);
		}
	};

	return (
		<>
			<Card className='p-6 w-[320px] mx-auto text-xs text-gray-600'>
				<h1 className='text-xl font-bold mb-4 text-htx-blue'>
					Let's secure your account
				</h1>
				<form className='flex flex-col gap-4' onSubmit={nextHandler}>
					{/* Start Password */}
					<div>
						<div className='mb-2 block'>
							<Label className='text-sm font-semibold ml-1'>
								Your Password
							</Label>
						</div>
						<div className='mb-2 block relative'>
							<Input
								id='password1'
								type={showPassword ? 'text' : 'password'}
								required
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
								className='w-full  px-3 py-2 border border-gray-300 rounded-md text-xs mt-1 placeholder:text-xs'
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
							<Label className='text-sm font-semibold ml-1'>
								Confirm Password
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
								className='w-full  px-3 py-2 border border-gray-300 rounded-md text-xs mt-1 placeholder:text-xs'
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
							<span className='text-xs text-red-500'>{passwordErrorText}</span>
						)}
					</div>
					{/* End Confirm password */}

					{/* Start Passcode */}
					<div className='space-y-1'>
						<Label
							htmlFor='passcode'
							className='text-sm font-semibold ml-1'
							color={passCodeError ? 'failure' : ''}
						>
							Enter a 6 digit pin code
						</Label>
						<div>
							<Input
								id='passcode'
								type='text'
								placeholder='Enter a 6 digit pin code'
								required
								color={passCodeError ? 'failure' : ''}
								value={passCode}
								onChange={handlePassCode}
								onBlur={() => setPassCodeError(passCode.length !== 6)}
								className='w-full px-3 py-2 border rounded-md text-xs mt-1 placeholder:text-xs'
							/>
							{passCodeError && (
								<span className='text-xs text-red-500'>
									Please enter a 6 digit pin code
								</span>
							)}
						</div>
					</div>

					<div className=' grid grid-cols-2 gap-4'>
						<Button
							type='submit'
							className='w-full bg-gray-400 hover:bg-icm-green-700 text-gray-800 font-semibold'
							onClick={() => dispatch(handlePrevious(3))}
						>
							Back
						</Button>
						<Button
							type='submit'
							className='w-full bg-htx-blue hover:bg-icm-green-700 text-gray-100 font-semibold'
						>
							Next
						</Button>
					</div>
				</form>
			</Card>
		</>
	);
};

export default Security;
