'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from '@/public/images/logos/logo-blue-01.png';
import Link from 'next/link';
import { BellDot, Menu } from 'lucide-react';
import { UserDropdownMenu } from '../UserDropdownMenu';

const AuthNavBar = () => {
	const router = useRouter();

	return (
		<div className='heder-bg sticky top-0 border-b border-b-primary/10 header z-50 bg-slate-900 shadow-sm'>
			<div className='max-w-[1920px] w-full mx-auto xl:px-20 px-2 py-3'>
				<div className='flex justify-between items-center'>
					<div className=' flex items-center gap-1 cursor-pointer'>
						<div>
							<Image
								src={Logo}
								alt='logo'
								className='w-32'
								onClick={() => router.push('/')}
							/>
						</div>
					</div>

					<div className=' flex items-center gap-3'>
						<div className='flex gap-2'>
							<Link href='/notifications'>
								<BellDot className='text-htx-blue' />
							</Link>

							{/* UserDropdownMenu */}
							<UserDropdownMenu />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthNavBar;
