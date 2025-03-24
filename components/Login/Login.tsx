'use client';
import toast from 'react-hot-toast';
import PulseLoader from 'react-spinners/PulseLoader';
import { fetchBaseQueryError } from '@/redux/services/helpers';

import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';
import { useLoginUserMutation } from '@/redux/features/auth/authApi';
import { useRouter } from 'next/navigation';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const Login = () => {
	const [loginUser, { isLoading, isError, error, isSuccess }] =
		useLoginUserMutation();
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(false);
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();
	// handle login
	const handleLogin = async (e: any) => {
		e.preventDefault();
		if (email.length > 0 && !email.includes('@')) {
			setEmailError(true);
			toast.error('Please enter a valid email address');
			return;
		}
		loginUser({ email, password });
	};

	// useEffect to handle success
	useEffect(() => {
		if (isSuccess) {
			toast.success('Login successful');
			router.push('/dashboard');
		}

		if (isError) {
			toast.error((error as fetchBaseQueryError).data?.message);
			if ((error as fetchBaseQueryError).status === 421) {
				router.push('/verify-email?email=' + email);
			}
			if ((error as fetchBaseQueryError).status === 422) {
				router.push('/suspend');
			}
		}
	}, [isSuccess, isError, error]);

	return (
		<>
			<h1 className='text-xl font-bold mb-4 text-htx-blue'>
				Please Login to your account.
			</h1>
			<Card className='max-w-md w-full p-4  '>
				<form className='flex flex-col gap-4' onSubmit={handleLogin}>
					{/* Start Email */}
					<div className=' block '>
						<Label
							htmlFor='email1'
							className='text-gray-800 text-sm font-semibold ml-1'
						>
							Enter your email address
						</Label>
						<div>
							<Input
								className='w-full px-3 py-2 border rounded-md text-xs mt-1 placeholder:text-xs'
								id='email'
								type='email'
								placeholder='e.g example@gmail.com'
								required
								color={emailError ? 'failure' : ''}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								onBlur={() =>
									setEmailError(email.length > 0 && !email.includes('@'))
								}
							/>
							{emailError && (
								<span className='text-xs text-red-500'>
									Please enter a valid email address
								</span>
							)}
						</div>
					</div>
					{/* End Email */}
					<div>
						<Label
							htmlFor='password1'
							className='text-gray-800 text-sm font-semibold ml-1'
						>
							Enter your password
						</Label>

						<div className='mb-2 block relative'>
							<Input
								className='w-full px-3 py-2 border rounded-md text-xs mt-1 placeholder:text-xs'
								id='password1'
								type={showPassword ? 'text' : 'password'}
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder='Enter your password'
							/>
							<button
								type='button'
								onClick={() => setShowPassword(!showPassword)}
								className='absolute inset-y-0 text-gray-500 right-0 pr-3 flex items-center text-sm leading-5'
							>
								{showPassword ? <FaEyeSlash /> : <FaEye />}
							</button>
						</div>
					</div>
					<div className='flex items-center text-xs  justify-between gap-2'>
						<p className='text-primary-500  hover:text-blue-700 font-bold cursor-pointer hover:underline '>
							<Link href='/forgot-password'>
								<span className='text-primary-500'>Forgot password?</span>
							</Link>
						</p>

						<p className='text-xs font-semibold text-gray-500'>
							Don't have an account?{' '}
							<Link href='/register-email'>
								<span className='text-xs font-bold text-gray-700 hover:underline hover:text-blue-700 '>
									Register
								</span>
							</Link>
						</p>
					</div>
					<Button
						type='submit'
						className='bg-htx-blue hover:bg-icm-green text-white'
					>
						{isLoading ? (
							<PulseLoader color='#fff' size={8} margin={2} />
						) : (
							<span>Login</span>
						)}
					</Button>
				</form>
			</Card>
		</>
	);
};

export default Login;
