'use client';
import React from 'react';
import Image from 'next/image';
import HeroImg from '../../public/images/hero/hero-img.png';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Gift, MoveRight } from 'lucide-react';
import Container from '../layout/Container';
import toast from 'react-hot-toast';
import Link from 'next/link';

const HeroSection = () => {
	return (
		<Container>
			<div className='flex flex-col-reverse md:flex-row justify-between items-center gap-2 my-5 '>
				<div className='space-y-4 w-full'>
					<h1 className='text-4xl font-bold'>
						Trade Only on <span className='text-htx-blue'>HTX</span>
					</h1>
					<div className='flex gap-1 text-sm items-center'>
						<Gift className='text-htx-blue' />
						<p>Sign up, start trading, and maximize your earnings!</p>
					</div>
					<div className='flex gap-2'>
						<Input type='email' placeholder='Email' />
						<Link href='/register-email'>
							<Button className='bg-htx-blue hover:bg-blue-400 space-x-1'>
								<span>Register Now</span>
								<MoveRight />
							</Button>
						</Link>
					</div>
				</div>
				<div className='order-1 md:order-2'>
					<Image
						src={HeroImg}
						alt='hero-img'
						className='md:w-[70%] justify-self-end'
					/>
				</div>
			</div>
		</Container>
	);
};

export default HeroSection;
