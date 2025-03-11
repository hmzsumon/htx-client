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
import { useGetVerifyCodeForRegisterMutation } from '@/redux/features/auth/authApi';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
	email: z.string().email('Please enter a valid email address.'),
});

export function InputForm() {
	const router = useRouter();
	const [getVerifyCodeForRegister, { isLoading, isSuccess, isError, error }] =
		useGetVerifyCodeForRegisterMutation();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: '',
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
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
								/>
							</FormControl>
							<FormMessage className='text-xs' />
						</FormItem>
					)}
				/>
				<Button
					type='submit'
					className='bg-htx-blue hover:bg-blue-400 w-full'
					disabled={isLoading}
				>
					{isLoading ? 'Processing...' : 'Next'}
				</Button>
			</form>
		</Form>
	);
}

export default InputForm;
