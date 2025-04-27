'use client'; // ✅ Ensure it's a client component
import React from 'react';
import { Card } from '../ui/card';
import Image from 'next/image';
import MenuIcon from '@/public/images/icons/options.png';
import Link from 'next/link';

const DashboardMenuCard = ({ bgColor, title, items }: any) => {
	return (
		<div className='px-2 md:px-4'>
			<Card className={`p-2 ${bgColor}`}>
				<div className='border-b border-gray-200 pb-4'>
					<div className='flex gap-1 items-center'>
						<div className=''>
							<Image src={MenuIcon} alt='icon' width={15} height={15} />
						</div>
						<h2 className=' text-sm font-bold text-blue-900'>{title}</h2>
					</div>
				</div>

				<div className='grid grid-cols-3 gap-4 mt-4'>
					{items.map((item: any) => (
						<Link key={item.id} href={item?.link}>
							<li
								className={`list-none flex flex-col items-center gap-1  p-2 rounded-md shadow-sm relative ${
									item.is_active ? ' bg-pink-200' : 'bg-white'
								}`}
							>
								{item.is_active && (
									<span className=' absolute top-0 right-0 font-semibold text-sm text-green-500'>
										⚡
									</span>
								)}

								{item.iconImg ? (
									<Image
										src={item.iconImg}
										alt='icon'
										className='w-8 h-8 object-contain'
									/>
								) : item.icon ? (
									<item.icon size={20} /> // ✅ Ensure this is a component, not a function
								) : null}
								<p className='text-[.70rem] font-semibold text-blue-900'>
									{item.title}
								</p>
							</li>
						</Link>
					))}
				</div>
			</Card>
		</div>
	);
};

export default DashboardMenuCard;
