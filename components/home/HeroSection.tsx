import React from 'react';
import Image from 'next/image';
import HeroImg from '../../public/images/hero/hero-img.png';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';

const HeroSection = () => {
	return (
		<div className='flex flex-col-reverse md:flex-row justify-between items-center gap-2 my-5'>
			<div className='space-y-4'>
				<h1 className='text-4xl font-bold'>
					Trade Only on <span className='text-htx-blue'>HTX</span>
				</h1>
				<div className='flex gap-1 text-sm items-center'>
					<Gift className='text-htx-blue' />
					<p>Sign up, start trading, and maximize your earnings!</p>
				</div>
				<div className='flex gap-2'>
					<Input type='email' placeholder='Email' />
					<Button className='bg-htx-blue hover:bg-blue-400'>
						Register Now
					</Button>
				</div>
			</div>
			<div className='order-1 md:order-2'>
				<Image src={HeroImg} alt='hero-img' />
			</div>
		</div>
	);
};

export default HeroSection;
