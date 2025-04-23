'use client';
import { BreadcrumbInner } from '@/components/BreadcrumbInner';
import AuthFooter from '@/components/layout/AuthFooter';
import AuthNavBar from '@/components/layout/AuthNavBar';
import { TickerProvider } from '@/TickerContext';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import Image from 'next/image';
import HistoryIcon from '@/public/images/icons/history.png';
import Link from 'next/link';

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	const router = useRouter();
	const pathname = usePathname();

	// Split the path into parts (e.g. /settings/personal-info → ['settings', 'personal-info'])
	const segments = pathname.split('/').filter((seg) => seg !== ''); // remove empty strings
	console.log('Breadcrumb segments:', segments);

	const iconRoutes = ['deposit', 'withdraw', 'transfer'];
	const isIcon = iconRoutes.includes(segments[0]);

	return (
		<div className='bg-gray-200'>
			<div className='fixed top-0 left-0 w-full z-50 bg-gray-200'>
				<div className='flex items-center justify-between px-4 py-2 bg-white '>
					<button type='button' onClick={() => router.back()}>
						<MdKeyboardDoubleArrowLeft className='' />
					</button>
					<BreadcrumbInner />
					{isIcon ? (
						<Link
							href={`${segments[0].replace(/-/g, ' ')}-history`}
							className='flex items-center gap-2'
						>
							<Image src={HistoryIcon} alt='History Icon' className='w-5 h-5' />
						</Link>
					) : (
						<div></div>
					)}
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
