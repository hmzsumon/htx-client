'use client';
import React from 'react';
import Container from './Container';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from '@/public/pyc-logo.png';
import localFont from 'next/font/local';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const NavBar = () => {
	const router = useRouter();

	return (
		<div className='sticky top-0 border border-b-primary/10 header z-50 '>
			<Container>
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

						<div>HTX Trade</div>
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
							<Link href='/login'>
								<Button className=' button bg-htx-blue'>
									<span className='button__title text-white'> Log in </span>
								</Button>
							</Link>
							<Link href='/sign-up'>
								<Button className='bg-htx-blue'>
									<span className=''>Sign up</span>
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default NavBar;
