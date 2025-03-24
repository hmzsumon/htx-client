'use client';
import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';

import countries from '@/lib/countries';
import {
	setActiveStep,
	setCompletedStep,
	handleNext,
	setPersonalData,
} from '@/redux/stepperSlice';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const PersonalDetails = () => {
	const dispatch = useDispatch();
	const [country, setCountry] = useState('');
	const [name, setName] = useState('');
	const [nameError, setNameError] = useState(false);
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(false);
	const [emailErrorText, setEmailErrorText] = useState(
		'Please enter a valid email address'
	);
	const [code, setCode] = useState<string>('us');
	const [referralCode, setReferralCode] = useState<string>('');
	const [edit, setEdit] = useState(true);
	const [phone, setPhone] = useState<string>('');
	const [phoneError, setPhoneError] = useState<boolean>(false);

	const searchParams = useSearchParams();
	const referral_code = searchParams.get('referral_code');
	const linkEmail = searchParams.get('email');

	useEffect(() => {
		if (linkEmail) {
			setEmail(linkEmail);
		}
	}, [linkEmail]);

	useEffect(() => {
		if (referral_code) {
			setReferralCode(referral_code);
			setEdit(false);
		}
	}, [referral_code]);

	useEffect(() => {
		dispatch(setActiveStep(1));
	}, [dispatch]);

	const handlePhoneNumberChange = (value: string) => {
		setPhoneError(false);
		setPhone(value);
	};

	const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selected = countries.find((item) => item.name === e.target.value);
		setCountry(e.target.value);
		if (selected) setCode(selected.code.toLowerCase());
	};

	const nextHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (nameError || emailError || phoneError) return;

		dispatch(
			setPersonalData({
				country,
				name,
				email,
				mobile: phone,
				referralCode: referralCode ? referralCode : 'U202506',
			})
		);
		dispatch(setCompletedStep(1));
		dispatch(handleNext());
	};

	return (
		<Card className='p-6 w-[320px] md:m mx-auto text-xs text-gray-600'>
			<h1 className='text-xl text-htx-blue font-bold mb-4'>
				Fill in your personal details
			</h1>
			<form className='space-y-4 text-sx' onSubmit={nextHandler}>
				{/* Country Select */}
				<div>
					<Label htmlFor='countries' className='text-sm font-semibold ml-1'>
						Select your country
					</Label>
					<select
						value={country}
						onChange={handleCountryChange}
						required
						className='w-full px-3 py-2 border rounded-md text-xs mt-1'
					>
						<option value='' disabled>
							Select your country
						</option>
						{countries.map((countryItem) => (
							<option key={countryItem.code} value={countryItem.name}>
								{countryItem.name}
							</option>
						))}
					</select>
				</div>

				{/* Name Input */}
				<div>
					<Label htmlFor='name' className='text-sm font-semibold ml-1'>
						Your Name
					</Label>
					<Input
						id='name'
						type='text'
						placeholder='Enter your name'
						required
						value={name}
						onChange={(e) => setName(e.target.value)}
						onBlur={() => setNameError(name.length === 0)}
						className='w-full px-3 py-2 border rounded-md text-xs mt-1 placeholder:text-xs'
					/>
					{nameError && (
						<p className='text-xs text-red-500'>Please enter your name</p>
					)}
				</div>

				{/* Phone Input */}
				<div className='space-y-1'>
					<Label htmlFor='phone' className='text-sm font-semibold ml-1'>
						Phone Number
					</Label>
					<PhoneInput
						placeholder='Enter phone number'
						value={phone}
						onChange={handlePhoneNumberChange}
						country={code}
						countryCodeEditable={false}
						disableDropdown
						containerClass='w-full'
						inputClass='w-full px-3 py-2 border rounded-md'
						inputStyle={{
							width: '100%',
							backgroundColor: 'transparent',
							fontSize: '0.75rem',
						}}
					/>
					{phoneError && (
						<p className='text-xs text-red-500'>
							Please enter a valid phone number
						</p>
					)}
				</div>

				{/* Partner Code Input */}
				<div className='space-y-1'>
					<Label htmlFor='referralCode' className='text-sm font-semibold ml-1 '>
						Partner Code (Optional)
					</Label>
					<Input
						id='referralCode'
						type='text'
						placeholder='Enter your partner code'
						value={referralCode}
						onChange={(e) => setReferralCode(e.target.value)}
						disabled={!edit}
						className='w-full px-3 py-2 border rounded-md text-xs mt-1 placeholder:text-xs'
					/>
				</div>

				{/* Submit Button */}
				<Button
					type='submit'
					className='w-full bg-htx-blue hover:bg-blue-700 text-white font-bold'
				>
					Next
				</Button>
			</form>
		</Card>
	);
};

export default PersonalDetails;
