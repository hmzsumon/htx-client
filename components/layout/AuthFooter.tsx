'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Gem } from 'lucide-react';
import './AuthFooter.css';
import Image from 'next/image';
import Dashboard from '@/public/images/icons/dashboard.png';
import Award from '@/public/images/icons/rank.png';
import Wallet2 from '@/public/images/icons/wallet_2.png';
import User2 from '@/public/images/icons/user-edit.png';

const AuthFooter = () => {
	const pathname = usePathname();

	const isActive = (path: string) => pathname === path;

	return (
		<div className='z-50 footer-bg w-full fixed bottom-0 bg-[#8CE5C1] grid grid-cols-3 px-4 py-1 rounded-t-2xl font-bold'>
			{/* Start Upper Section */}
			<div className='text-slate-600'>
				<div className='flex justify-center h-full items-center gap-4'>
					<div className='w-full'>
						<li className='list-none'>
							<Link href='/dashboard'>
								<span
									className={`flex flex-col items-center gap-1 ${
										isActive('/dashboard') ? 'text-blue-700' : ''
									}`}
								>
									<Image
										src={Dashboard}
										alt='icon'
										className='w-8 h-8 object-contain'
									/>
									<span className='text-xs'>Dashboard</span>
								</span>
							</Link>
						</li>
					</div>

					<div className='w-full'>
						<li className='list-none'>
							<Link href='/rank-reward'>
								<span
									className={`flex flex-col items-center gap-1 ${
										isActive('/rank-reward') ? 'text-blue-700' : ''
									}`}
								>
									<Image
										src={Award}
										alt='icon'
										className='w-8 h-8 object-contain'
									/>
									<span className='text-xs'>Rank</span>
								</span>
							</Link>
						</li>
					</div>
				</div>
			</div>
			{/* End Upper Section */}

			<div className='relative w-full gap-2'>
				<Link href='/promotion'>
					<div className='absolute bottom-14 left-1/2 transform -translate-x-1/2'>
						<div className='relative z-20 rounded-full flex justify-center items-center text-lg font-bold'>
							<div
								className={`${
									isActive('/promotion') ? 'bg-blue-700' : 'bg-htx-blue'
								} z-20 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer absolute`}
							>
								<Gem className='text-white' />
							</div>

							<div
								className='w-12 h-12 bg-white absolute top-3/4 z-10'
								style={{ clipPath: 'ellipse(50% 50% at 50% 0%)' }}
							></div>
						</div>
					</div>
				</Link>
				<div className='text-center my-1'>
					<Link href='/promotion'>
						<p
							className={`text-xs mt-7 ${
								isActive('/promotion') ? 'text-blue-700' : 'text-slate-600'
							}`}
						>
							Promotion
						</p>
					</Link>
				</div>
			</div>

			{/* Start Lower Section */}
			<div className='text-slate-600'>
				<div className='flex justify-center h-full items-center gap-4'>
					<div className='w-full'>
						<li className='list-none'>
							<Link href='/wallet'>
								<span
									className={`flex flex-col items-center gap-1 ${
										isActive('/wallet') ? 'text-blue-700' : ''
									}`}
								>
									<Image
										src={Wallet2}
										alt='icon'
										className='w-8 h-8 object-contain'
									/>
									<span className='text-xs'>Wallet</span>
								</span>
							</Link>
						</li>
					</div>

					<div className='w-full'>
						<li className='list-none'>
							<Link href='/profile'>
								<span
									className={`flex flex-col items-center gap-1 ${
										isActive('/profile') ? 'text-blue-700' : ''
									}`}
								>
									<Image
										src={User2}
										alt='icon'
										className='w-8 h-8 object-contain'
									/>
									<span className='text-xs'>Profile</span>
								</span>
							</Link>
						</li>
					</div>
				</div>
			</div>
			{/* End Lower Section */}
		</div>
	);
};

export default AuthFooter;
