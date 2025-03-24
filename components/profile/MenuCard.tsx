'use client'; // ✅ Ensure it's a client component
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MenuCard = ({ items }: any) => {
	return (
		<div className='px-2 md:px-4'>
			<div>
				<div className='grid grid-cols-4 gap-4 mt-4'>
					{items.map((item: any) => (
						<Link key={item.id} href={item?.link}>
							<li className='list-none flex flex-col items-center gap-1 bg-white p-2 rounded-md '>
								{/* Conditionally render either an image or an icon */}
								{item.iconImg ? (
									<Image
										src={item.iconImg}
										alt='icon'
										className='w-8 h-8 object-contain'
									/>
								) : item.icon ? (
									<item.icon size={20} /> // ✅ Ensure this is a component, not a function
								) : null}
								<p className='text-xs font-bold text-blue-900'>{item.title}</p>
							</li>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default MenuCard;
