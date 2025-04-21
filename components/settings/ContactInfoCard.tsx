'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import PulseLoader from 'react-spinners/PulseLoader';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import { Card } from '../ui/card';
import Image from 'next/image';
import Gmail from '@/public/images/icons/gmail.png';
import Phone from '@/public/images/icons/phone-book.png';
import Edit from '@/public/images/icons/edit.png';
import Save from '@/public/images/icons/save.png';
import { useSelector } from 'react-redux';
import { Input } from '@/components/ui/input';
import { useUpdateMobileNumberMutation } from '@/redux/features/auth/authApi';

const ContactInfoCard = () => {
	const [updateMobileNumber, { isLoading, isError, isSuccess, error }] =
		useUpdateMobileNumberMutation();
	const { user } = useSelector((state: any) => state.auth);
	const fullMobile = user?.mobile || '8801XXXXXXXXX';
	const [isEditing, setIsEditing] = useState(false);
	const [mobile, setMobile] = useState(fullMobile.slice(3)); // remove country code for edit

	const handleSave = () => {
		const finalMobile = `880${mobile}`;
		console.log('📱 Updated Mobile:', finalMobile);

		// 🔁 Call backend to update user.mobile here
		setIsEditing(false);
		updateMobileNumber({ mobile: finalMobile })
			.unwrap()
			.then((res) => {
				console.log('✅ Mobile updated:', res);
				if (res?.success) {
					toast.success('Mobile number updated successfully!');
				} else {
					toast.error('Failed to update mobile number!');
				}
			})
			.catch((err) => {
				console.error('❌ Error updating mobile:', err);
			});
	};

	return (
		<div>
			<Card className='p-4 space-y-4 bg-fuchsia-200'>
				<h2 className='text-gray-800 font-bold'>Contact Info</h2>
				<hr />
				<div className='text-xs font-bold space-y-2'>
					<Card className='p-2'>
						<div className='flex items-center gap-2'>
							<Image
								src={Gmail}
								alt='email'
								className='w-5 h-5 object-contain'
							/>
							<p>{user?.email}</p>
						</div>
					</Card>

					<Card className='p-2'>
						<div className='flex justify-between items-center'>
							<div className='flex items-center gap-2 w-full'>
								<Image
									src={Phone}
									alt='phone'
									className='w-6 h-6 object-contain'
								/>
								{isEditing ? (
									<div className='flex items-center gap-1 w-full'>
										<span className='text-sm'>+880</span>
										<Input
											type='text'
											value={mobile}
											onChange={(e) => setMobile(e.target.value)}
											className='text-xs w-full'
										/>
									</div>
								) : (
									<p>+{fullMobile}</p>
								)}
							</div>

							<div className='ml-2 cursor-pointer'>
								<Image
									src={isEditing ? Save : Edit}
									alt={isEditing ? 'save' : 'edit'}
									className='w-6 h-6 object-contain'
									onClick={() => {
										if (isEditing) {
											handleSave();
										} else {
											setIsEditing(true);
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

export default ContactInfoCard;
