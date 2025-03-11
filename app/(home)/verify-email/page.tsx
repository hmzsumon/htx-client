'use client';

import InputOTPForm from '@/components/register/InputOTPForm';
import { Card } from '@/components/ui/card';

export default function VerifyEmail() {
	return (
		<div className='w-11/12 md:w-7/12 mx-auto mt-10'>
			<Card className='p-6'>
				<InputOTPForm />
			</Card>
		</div>
	);
}
