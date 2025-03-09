import Container from '@/components/layout/Container';
import React from 'react';
import Icon from '@/public/images/logos/icon.png';
import Image from 'next/image';
import { clsx } from 'clsx';
import WhyHtx from '@/components/about-us/WhyHtx';
import Contact from '@/components/about-us/Contact';

const AboutUsPage = () => {
	return (
		<div>
			<Container>
				<div className='flex flex-col-reverse md:grid md:grid-cols-2 items-center justify-center gap-10 '>
					<div className='space-y-5'>
						<div className='space-y-3'>
							<h1 className='text-3xl font-bold text-center text-gray-900'>
								About Us
							</h1>
							<p className='text-gray-600 text-xs  '>
								HTX Trade is the world’s first algorithm-based comprehensive HTX
								trading platform, dedicated to using an innovative algorithmic
								trading model to provide liquidity for every type of Htx trade
								asset. The platform offers a one-stop HTX trading service for a
								wide range of scenarios, including metaverse assets, gaming
								items, and physical IPs, pioneering a new era in the Htx
								trade marketplace.
							</p>
						</div>
						<hr />
						<div className='flex justify-center items-center'>
							<div className='grid grid-cols-2 md:grid-cols-4 gap-5 '>
								<div>
									<h2 className='text-3xl font-bold  text-gray-800'>47M+</h2>
									<p className='text-xs text-gray-600'>
										Registered users worldwide
									</p>
								</div>
								<div>
									<h2 className='text-3xl font-bold  text-gray-800'>9M+</h2>
									<p className='text-xs text-gray-600'>Total trading users</p>
								</div>
								<div>
									<h2 className='text-3xl font-bold  text-gray-800'>33T+</h2>
									<p className='text-xs text-gray-600'>
										Cumulative trading volume
									</p>
								</div>
								<div>
									<h2 className='text-3xl font-bold  text-gray-800'>60B+</h2>
									<p className='text-xs text-gray-600'>Highest AUM (USDT)</p>
								</div>
							</div>
						</div>
					</div>
					<div className='order-1 md:order-2'>
						<Image src={Icon} alt='icon' className='w-36 mx-auto' />
					</div>
				</div>
				<div className='mt-10'>
					<WhyHtx />
				</div>
			</Container>
			<div className='mt-10'>
				<Contact />
			</div>
		</div>
	);
};

export default AboutUsPage;
