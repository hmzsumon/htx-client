'use client';
import React from 'react';
import Container from './Container';
import { Video } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

const NavBar = () => {
	const router = useRouter();
	const userId = 1;
	return (
		<div className='sticky top-0 border border-b-primary/10'>
			<Container>
				<div className='flex justify-between items-center'>
					<div
						className=' flex items-center gap-1 cursor-pointer'
						onClick={() => router.push('/')}
					>
						<Video />
						<div className='font-bold text-xl'>HTX Trade</div>
					</div>
					<div className=' flex items-center gap-3'>
						<>
							<Button
								size='sm'
								variant='outline'
								onClick={() => router.push('/sign-in')}
							>
								{' '}
								Sign In
							</Button>
							<Button size='sm' onClick={() => router.push('/sign-up')}>
								{' '}
								Sign Up
							</Button>
						</>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default NavBar;
