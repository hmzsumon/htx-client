'use client';
import InputForm from '@/components/register/EmailInputFrom';
import { Card } from '@/components/ui/card';
import { useLazyCheckUserByCustomIdQuery } from '@/redux/features/auth/authApi';
import { setPersonalData } from '@/redux/stepperSlice';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function RegisterEmail() {
	return (
		<div className='w-11/12 md:w-7/12 mx-auto mt-10'>
			<Card className='p-4'>
				<div className='my-5'>
					<h1 className='text-2xl font-bold'>
						Welcome to <span className='text-htx-blue'>HTX Trade</span>
					</h1>
				</div>
				<InputForm />
			</Card>
		</div>
	);
}
