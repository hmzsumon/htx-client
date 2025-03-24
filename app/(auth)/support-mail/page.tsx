import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const SupportMailPage = () => {
	return (
		<div className='flex flex-col md:flex-row gap-10 p-6 md:p-16 bg-white pb-24'>
			{/* Left Section */}
			<div className='w-full md:w-1/2'>
				<h2 className='text-2xl font-bold'>Let's Talk</h2>
				<p className='text-gray-600 text-sm mt-2'>
					If you need support or have any inquiries, don't hesitate to get in
					touch. We're here to answer your questions and provide
					the help you need.
				</p>

				{/* Email Section */}
				<div className='mt-6'>
					<h3 className='text-lg font-semibold'>Email</h3>
					<div className='flex items-center gap-2 mt-2'>
						<Mail className='text-blue-500' />
						<a
							href='support@htxtrade.org'
							className='text-blue-500 font-medium'
						>
							support@htxtrade.org
						</a>
					</div>
				</div>

				{/* Socials Section */}
				<div className='mt-6'>
					<h3 className='text-lg font-semibold'>Socials</h3>
					<div className='flex gap-4 mt-2'>
						<a
							href='#'
							className='p-2 bg-gray-100 rounded-full hover:bg-blue-100'
						>
							<FaFacebookF className='text-blue-600' />
						</a>
						<a
							href='#'
							className='p-2 bg-gray-100 rounded-full hover:bg-blue-100'
						>
							<FaLinkedinIn className='text-blue-600' />
						</a>
						<a
							href='#'
							className='p-2 bg-gray-100 rounded-full hover:bg-blue-100'
						>
							<FaInstagram className='text-blue-600' />
						</a>
					</div>
				</div>
			</div>

			{/* Right Section */}
			<div className='w-full md:w-1/2'>
				<div className='space-y-4'>
					<Input placeholder='Name' className='bg-gray-100' />
					<Input placeholder='Email' className='bg-gray-100' />
					<Input placeholder='Subject' className='bg-gray-100' />
					<Textarea placeholder='Message' className='bg-gray-100' rows={4} />
					<Button className='w-full bg-blue-500 hover:bg-blue-600 text-white text-lg'>
						Send
					</Button>
				</div>
			</div>
		</div>
	);
};

export default SupportMailPage;
