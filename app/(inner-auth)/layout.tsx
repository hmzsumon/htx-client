'use client';
import { BreadcrumbInner } from '@/components/BreadcrumbInner';
import AuthFooter from '@/components/layout/AuthFooter';
import AuthNavBar from '@/components/layout/AuthNavBar';
import { TickerProvider } from '@/TickerContext';
import { useRouter } from 'next/navigation';
import React from 'react';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	const router = useRouter();
	return (
		<div className='bg-gray-200'>
			<div className='fixed top-0 left-0 w-full z-50 bg-gray-200'>
				<div className='flex items-center justify-between px-4 py-2 bg-white '>
					<button type='button' onClick={() => router.back()}>
						<MdKeyboardDoubleArrowLeft className='' />
					</button>
					<BreadcrumbInner />
					<div></div>
				</div>
			</div>
			<div className='py-[0.09rem] mt-10'>
				<div className='pb-20'>{children}</div>
			</div>
			<AuthFooter />
		</div>
	);
};

export default AuthLayout;
