'use client';
import React from 'react';
import { Card } from '../ui/card';
import Image from 'next/image';
import Country from '@/public/images/icons/country.png';
import City from '@/public/images/icons/location.png';
import Edit from '@/public/images/icons/edit.png';
import Address from '@/public/images/icons/home.png';

import { useSelector } from 'react-redux';

const AddressInfoCard = () => {
	const { user } = useSelector((state: any) => state.auth);
	return (
		<div>
			<Card className='p-4 space-y-4 bg-purple-300'>
				<div>
					<h2 className='text-gray-800 font-bold'>Address Info</h2>
				</div>
				<hr />
				<div className=' text-xs font-bold space-y-2'>
					<Card className='p-2 '>
						<div className=' flex items-center gap-2 '>
							<Image
								src={Country}
								alt='icon'
								className='w-5 h-5 object-contain'
							/>
							<li className='grid grid-cols-12 gap-2 items-center'>
								<span className='text-xs font-bold col-span-5'>Country</span>
								<span className='font-bold col-span-1'>:</span>
								<span className='text-xs font-bold col-span-6 flex items-center'>
									Bangladesh
								</span>
							</li>
						</div>
					</Card>
					<Card className='p-2'>
						<div className='flex justify-between items-center'>
							<div className=' flex items-center gap-2 '>
								<Image
									src={City}
									alt='icon'
									className='w-6 h-6 object-contain'
								/>
								<li className='grid grid-cols-12 gap-2 items-center'>
									<span className='text-xs font-bold col-span-5'>City</span>
									<span className='font-bold col-span-1'>:</span>
									<span className='text-xs font-bold col-span-6 flex items-center'>
										Sylhet
									</span>
								</li>
							</div>
							<div>
								<Image
									src={Edit}
									alt='icon'
									className='w-6 h-6 object-contain'
								/>
							</div>
						</div>
					</Card>
					<Card className='p-2'>
						<div className='flex justify-between items-center'>
							<div className=' flex items-center gap-2 '>
								<Image
									src={Address}
									alt='icon'
									className='w-6 h-6 object-contain'
								/>
								<li className='grid grid-cols-12 gap-2 items-center'>
									<span className='text-xs font-bold col-span-3'>Address</span>
									<span className='font-bold col-span-1'>:</span>
									<span className='text-xs font-bold col-span-8 flex items-center'>
										Ambarkkhana, Sylhet
									</span>
								</li>
							</div>
							<div>
								<Image
									src={Edit}
									alt='icon'
									className='w-6 h-6 object-contain'
								/>
							</div>
						</div>
					</Card>
				</div>
			</Card>
		</div>
	);
};

export default AddressInfoCard;
