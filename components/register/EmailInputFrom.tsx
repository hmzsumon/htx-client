'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
	useCheckEmailExistOrNotMutation,
	useGetVerifyCodeForRegisterMutation,
} from '@/redux/features/auth/authApi';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PulseLoader } from 'react-spinners';

const FormSchema = z.object({
	email: z.string().email('Please enter a valid email address.'),
});

export function InputForm() {
	const router = useRouter();
	const [getVerifyCodeForRegister, { isLoading, isSuccess, isError, error }] =
		useGetVerifyCodeForRegisterMutation();

	const [checkEmailExistOrNot, { data, isLoading: checkingEmail }] =
		useCheckEmailExistOrNotMutation();
	const { isExist } = data || {};

	const [emailError, setEmailError] = useState(false);
	const [emailErrorText, setEmailErrorText] = useState('');

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: '',
		},
	});

	// Check if email exists when user stops typing
	const handleEmailCheck = async (email: string) => {
		if (email) {
			const result = await checkEmailExistOrNot({ email });
			if ('data' in result && result.data?.isExist) {
				setEmailError(true);
				setEmailErrorText('Email already exists');
			} else {
				setEmailError(false);
				setEmailErrorText('');
			}
		}
	};

	function onSubmit(data: z.infer<typeof FormSchema>) {
		if (emailError) {
			return;
		}
		getVerifyCodeForRegister({ email: data.email });
		toast.success(`You submitted: ${data.email}`);
	}

	useEffect(() => {
		if (isSuccess) {
			router.push('/verify-email?email=' + form.getValues('email'));
		}
		if (isError && error) {
			toast.error((error as fetchBaseQueryError).data?.message);
		}
	}, [isSuccess, isError, error]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-xs font-bold ml-1'>
								Enter a valid email
							</FormLabel>
							<FormControl>
								<Input
									placeholder='Enter your email'
									{...field}
									type='email'
									className='placeholder:text-xs'
									onBlur={() => handleEmailCheck(field.value)} // Check email existence when user leaves the input field
								/>
							</FormControl>
							{emailError && (
								<p className='text-xs text-red-500 font-semibold ml-1'>
									{emailErrorText}
								</p>
							)}
							<FormMessage className='text-xs' />
						</FormItem>
					)}
				/>
				<Button
					type='submit'
					className='bg-htx-blue hover:bg-blue-400 w-full'
					disabled={isLoading || checkingEmail}
				>
					{isLoading ? (
						<PulseLoader color='#fff' size={8} margin={2} />
					) : (
						<span>Next</span>
					)}
				</Button>
			</form>
		</Form>
	);
}

export default InputForm;
