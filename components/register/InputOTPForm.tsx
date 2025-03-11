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
import { Card } from '@/components/ui/card';
import {
	useVerifyCodeForRegisterMutation,
	useGetVerifyCodeForRegisterMutation,
} from '@/redux/features/auth/authApi';

const FormSchema = z.object({
	pin: z.string().min(6, {
		message: 'Your one-time password must be 6 characters.',
	}),
});

export function InputOTPForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const email = searchParams.get('email'); // Get email from URL

	const [verifyCodeForRegister, { isLoading }] =
		useVerifyCodeForRegisterMutation();
	const [getVerifyCodeForRegister] = useGetVerifyCodeForRegisterMutation();

	const [timer, setTimer] = useState(60); // 60 seconds countdown
	const [canResend, setCanResend] = useState(false);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			pin: '',
		},
	});

	// Countdown Timer Logic
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

	// Function to handle form submission
	async function onSubmit(data: z.infer<typeof FormSchema>) {
		if (!email) {
			toast.error('Email is missing from the URL.');
			return;
		}

		try {
			const response = await verifyCodeForRegister({
				email,
				verify_code: data.pin,
			}).unwrap();

			toast.success(response.message || 'Verification successful!');

			// Redirect user (Change to your route)
			router.push(`/register?email=${email}`);
		} catch (error) {
			const errorMessage = (error as fetchBaseQueryError).data?.message;
			if (!form.formState.errors.pin) {
				// Only show toast if there's no existing form error
				toast.error(errorMessage);
			}

			form.setError('pin', { type: 'manual', message: errorMessage }); // Set error manually
		}
	}

	// Function to handle resending OTP
	const handleResendCode = async (e: any) => {
		e.preventDefault();
		if (!email) {
			toast.error('Email is missing from the URL.');
			return;
		}

		try {
			await getVerifyCodeForRegister({ email }).unwrap();
			toast.success('New verification code sent.');
			setTimer(60); // Reset timer
			setCanResend(false); // Disable resend button again
		} catch (error) {
			toast.error(toast.error((error as fetchBaseQueryError).data?.message));
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
							<FormLabel className='text-lg font-bold'>
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
							onAuxClick={handleResendCode}
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
					{isLoading ? 'Verifying...' : 'Confirm'}
				</Button>
			</form>
		</Form>
	);
}

export default InputOTPForm;
