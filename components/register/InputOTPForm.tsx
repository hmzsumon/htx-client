'use client';

import { useState, useEffect } from 'react';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import { useSearchParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp';
import {
	useVerifyCodeForRegisterMutation,
	useGetVerifyCodeForRegisterMutation,
} from '@/redux/features/auth/authApi';
import { PulseLoader } from 'react-spinners';

const FormSchema = z.object({
	pin: z.string().min(6, {
		message: 'Your one-time password must be 6 characters.',
	}),
});

export function InputOTPForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const email = searchParams.get('email');

	const [verifyCodeForRegister, { isLoading }] =
		useVerifyCodeForRegisterMutation();
	const [getVerifyCodeForRegister] = useGetVerifyCodeForRegisterMutation();

	const [timer, setTimer] = useState(0);
	const [canResend, setCanResend] = useState(false);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			pin: '',
		},
	});

	// Load timer state from localStorage on first load
	useEffect(() => {
		const savedExpiry = localStorage.getItem('otp_timer_expires');
		if (savedExpiry) {
			const expires = parseInt(savedExpiry);
			const now = Date.now();
			if (expires > now) {
				const remaining = Math.floor((expires - now) / 1000);
				setTimer(remaining);
				setCanResend(false);
			} else {
				setCanResend(true);
			}
		} else {
			startTimer();
		}
	}, []);

	// Countdown logic
	useEffect(() => {
		if (timer > 0) {
			const interval = setInterval(() => {
				setTimer((prev) => prev - 1);
			}, 1000);
			return () => clearInterval(interval);
		} else {
			setCanResend(true);
		}
	}, [timer]);

	const startTimer = () => {
		const expiresAt = Date.now() + 60000; // 60 seconds
		localStorage.setItem('otp_timer_expires', expiresAt.toString());
		setTimer(60);
		setCanResend(false);
	};

	// Form Submit
	async function onSubmit(data: z.infer<typeof FormSchema>) {
		if (!email) return toast.error('Email is missing from the URL.');
		try {
			const response = await verifyCodeForRegister({
				email,
				verify_code: data.pin,
			}).unwrap();
			router.push(`/register?email=${email}`);
			toast.success(response.message || 'Verification successful!');
		} catch (error) {
			const errorMessage = (error as fetchBaseQueryError).data?.message;
			if (!form.formState.errors.pin) {
				toast.error(errorMessage);
			}
			form.setError('pin', { type: 'manual', message: errorMessage });
		}
	}

	// Resend code
	const handleResendCode = async (e: any) => {
		e.preventDefault();
		if (!email) return toast.error('Email is missing from the URL.');
		try {
			await getVerifyCodeForRegister({ email }).unwrap();
			toast.success('New verification code sent.');
			startTimer();
		} catch (error) {
			toast.error(
				(error as fetchBaseQueryError).data?.message || 'Error occurred'
			);
		}
	};

	return (
		<Form {...form}>
			<form className='w-full space-y-6'>
				<FormField
					control={form.control}
					name='pin'
					render={({ field }) => (
						<FormItem className='flex flex-col items-center justify-center'>
							<FormLabel className='text-lg font-bold text-htx-blue'>
								Enter the verification code
							</FormLabel>
							<FormDescription className='text-sm text-gray-500'>
								Verification code sent to{' '}
								<span className='font-bold'>{email}</span>
								<br />
								Consider checking your Spam folder.
							</FormDescription>
							<FormControl>
								<InputOTP maxLength={6} {...field}>
									<InputOTPGroup>
										{Array.from({ length: 6 }).map((_, index) => (
											<InputOTPSlot key={index} index={index} />
										))}
									</InputOTPGroup>
								</InputOTP>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='flex justify-end w-full text-sm text-gray-500 '>
					{canResend ? (
						<button
							onClick={handleResendCode}
							className='text-blue-500 hover:underline'
						>
							Resend
						</button>
					) : (
						<span>Resend in {timer}s</span>
					)}
				</div>

				<Button
					type='button'
					className='bg-blue-500 text-white hover:bg-blue-600 w-full'
					onClick={form.handleSubmit(onSubmit)}
					disabled={isLoading || form.watch('pin').length !== 6}
				>
					{isLoading ? (
						<PulseLoader color='#fff' size={8} margin={2} />
					) : (
						<span>Confirm</span>
					)}
				</Button>
			</form>
		</Form>
	);
}

export default InputOTPForm;
