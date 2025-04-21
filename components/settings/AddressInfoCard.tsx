// components/AddressInfoCard.tsx
'use client';
import React, { use, useEffect, useState } from 'react';
import { Card } from '../ui/card';
import Image from 'next/image';
import Country from '@/public/images/icons/country.png';
import City from '@/public/images/icons/location.png';
import Save from '@/public/images/icons/save.png';
import Edit from '@/public/images/icons/edit.png';
import Address from '@/public/images/icons/home.png';
import { useSelector } from 'react-redux';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';
import {
	useMyAddressQuery,
	useUpdateAddressMutation,
} from '@/redux/features/auth/authApi';

const AddressInfoCard = () => {
	const [updateAddress, { isLoading: u_isLoading, isError, isSuccess, error }] =
		useUpdateAddressMutation(); // Assuming this is a custom hook to update address
	const { data, isLoading } = useMyAddressQuery(undefined); // Assuming this is a custom hook to fetch address data
	const { address: dataAddress } = data || {}; // Destructure address from the data
	// Log the address data for debugging
	const { user } = useSelector((state: any) => state.auth);
	const [isEditingCity, setIsEditingCity] = useState(false);
	const [isEditingAddress, setIsEditingAddress] = useState(false);
	const [city, setCity] = useState(dataAddress?.city || '');
	const [address, setAddress] = useState(dataAddress?.address || '');

	useEffect(() => {
		if (dataAddress) {
			setCity(dataAddress.city);
			setAddress(dataAddress.address);
		}
	}, [dataAddress]);

	const handleSave = () => {
		updateAddress({ city, address })
			.unwrap()
			.then(() => {
				toast.success('Address updated successfully!');
				setIsEditingCity(false);
				setIsEditingAddress(false);
			})
			.catch((error) => {
				toast.error('Failed to update address!');
				console.error('Error updating address:', error);
			});
		setIsEditingCity(false);
		setIsEditingAddress(false);
	};

	return (
		<div>
			<Card className='p-4 space-y-4 bg-purple-300'>
				<div>
					<h2 className='text-gray-800 font-bold'>Address Info</h2>
				</div>
				<hr />
				<div className='text-xs font-bold space-y-2'>
					<Card className='p-2'>
						<div className='flex items-center gap-2'>
							<Image
								src={Country}
								alt='icon'
								className='w-5 h-5 object-contain'
							/>
							<li className='grid grid-cols-12 gap-2 items-center'>
								<span className='text-xs font-bold col-span-5'>Country</span>
								<span className='font-bold col-span-1'>:</span>
								<span className='text-xs font-bold col-span-6 flex items-center'>
									{user?.country || 'N/A'}
								</span>
							</li>
						</div>
					</Card>

					{/* City */}
					<Card className='p-2 list-none '>
						<div className='flex justify-between items-center'>
							<div className='flex items-center gap-2  w-full'>
								<Image
									src={City}
									alt='icon'
									className='w-6 h-6 object-contain'
								/>
								<div className=' flex items-center w-full '>
									<div className=' w-3/12 md:w-1/12 flex items-center justify-between pr-2 '>
										<span className='text-xs font-bold '>City</span>
										<span className='font-bold '>:</span>
									</div>
									<div className='w-/12 md:w-11/12 text-xs font-bold  flex items-center  '>
										{isEditingCity ? (
											<div>
												<Input
													type='text'
													value={city}
													onChange={(e) => setCity(e.target.value)}
													className='text-xs w-full'
												/>
											</div>
										) : (
											city || 'N/A'
										)}
									</div>
								</div>
							</div>
							<div>
								<Image
									src={isEditingCity ? Save : Edit}
									alt={isEditingCity ? 'save' : 'edit'}
									className='w-6 h-6 object-contain cursor-pointer'
									onClick={() => {
										if (isEditingCity) {
											handleSave();
										} else {
											setIsEditingCity(true);
										}
									}}
								/>
							</div>
						</div>
					</Card>

					{/* Address */}
					<Card className='p-2'>
						<div className='flex justify-between items-center'>
							<div className='flex items-center gap-2'>
								<Image
									src={Address}
									alt='icon'
									className='w-6 h-6 object-contain'
								/>
								<li className='flex items-center w-full'>
									<div className=' w-6/12 md:w-8/12 flex items-center justify-between pr-2 '>
										<span className='text-xs font-bold '>Address</span>
										<span className='font-bold '>:</span>
									</div>
									<div className='w-9/12 md:w-11/12 text-xs font-bold  flex items-center  '>
										{isEditingAddress ? (
											<Input
												type='text'
												value={address}
												onChange={(e) => setAddress(e.target.value)}
												className='text-xs'
											/>
										) : (
											address || 'N/A'
										)}
									</div>
								</li>
							</div>
							<div>
								<Image
									src={isEditingAddress ? Save : Edit}
									alt={isEditingAddress ? 'save' : 'edit'}
									className='w-6 h-6 object-contain cursor-pointer'
									onClick={() => {
										if (isEditingAddress) {
											handleSave();
										} else {
											setIsEditingAddress(true);
										}
									}}
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
