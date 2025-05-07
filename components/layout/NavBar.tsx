'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from '@/public/images/logos/logo-blue-01.png';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LogoText } from './AuthNavBar';

const NavBar = () => {
	const router = useRouter();

	return (
		<div className='sticky top-0 border-b border-b-primary/10 header z-50 bg-slate-950'>
			<div className='max-w-[1920px] w-full mx-auto xl:px-20 px-2 py-3'>
				<div className='flex justify-between items-center'>
					<div className=' flex items-center gap-1 cursor-pointer'>
						<LogoText />
					</div>

					<div className=' flex items-center gap-3'>
						<div className='flex gap-2'>
							<Link href='/login'>
								<Button className='bg-green-500 hover:bg-htx-blue'>
									<span className='button__title text-white'> Log in </span>
								</Button>
							</Link>
							<Link href='/register-email'>
								<Button className='bg-green-500 hover:bg-htx-blue'>
									<span className=''>Sign up</span>
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
