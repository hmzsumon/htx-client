import { Button } from 'flowbite-react';
import Link from 'next/link';
import React from 'react';

const RegisterBanner = ({ title, btn_title, url }: any) => {
	return (
		<div className='banner-bg bg-cover bg-center h-[200px] text-white space-y-2'>
			{/* <img src='/assets/live-banner.webp' alt='' /> */}
			<h2 className='text-3xl font-semibold  text-center pt-6'>{title}</h2>
			<p className=' text-center'>- Fast account opening & instant funding</p>
			<div className='flex justify-center md:w-5/12 mx-auto px-2 py-2'>
				<Link href={url}>
					<Button className='w-full bg-icm-green hover:bg-icm-green-700 text-gray-800 font-semibold'>
						{btn_title}
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default RegisterBanner;
