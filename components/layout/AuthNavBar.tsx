'use client';
import React from 'react';
import Container from './Container';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from '@/public/images/logos/logo_1.png';
import localFont from 'next/font/local';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BellDot, Menu } from 'lucide-react';

const AuthNavBar = () => {
	const router = useRouter();

	return (
		<div className='heder-bg sticky top-0 border-b border-b-primary/10 header z-50 bg-slate-900 shadow-sm'>
			<div className='max-w-[1920px] w-full mx-auto xl:px-20 px-2 py-3'>
				<div className='flex justify-between items-center'>
					<div className=' flex items-center gap-1 cursor-pointer'>
						{/* <Sheet>
							<SheetTrigger asChild>
								<Menu className='md:hidden ' size={34} />
							</SheetTrigger>
							<SheetContent>
								<SheetHeader>
									<SheetTitle>Edit profile</SheetTitle>
								</SheetHeader>
								<div>
									<SheetClose asChild>
										<Link
											href='/contact'
											className='bg-red-500 w-full px-4 py-2'
										>
											<span className='text-primary hover:text-primary-dark'>
												Contact
											</span>
										</Link>
									</SheetClose>
								</div>
							</SheetContent>
						</Sheet> */}

						<div>
							<Image
								src={Logo}
								alt='logo'
								className='w-28'
								onClick={() => router.push('/')}
							/>
						</div>
					</div>
					{/* <div>
						<div className='hidden md:flex gap-3'>
							<Link href='/contact'>
								<span className='text-primary hover:text-primary-dark'>
									Contact
								</span>
							</Link>
							<Link href='/contact'>
								<span className='text-primary hover:text-primary-dark'>
									About
								</span>
							</Link>
						</div>
					</div> */}
					<div className=' flex items-center gap-3'>
						<div className='flex gap-2'>
							<Link href='/notifications'>
								<BellDot className='text-htx-blue' />
							</Link>

							<Menu className='text-htx-blue cursor-pointer' />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthNavBar;
