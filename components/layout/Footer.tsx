import React from 'react';
import Logo2 from '@/public/images/logos/logo_2.png';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
	return (
		<div className=' pt-10 border-t border-t-primary/10 bg-htx-blue'>
			<div className=' px-4'>
				<div className=' grid grid-cols-2 items-center '>
					<div className=' space-y-3 '>
						<Image src={Logo2} alt='logo' className=' w-28 ' />
						<div>
							<p className=' text-xs font-semibold text-gray-100'>
								26/1, Sofiyskaya Embankment, 117997, Moscow, Russian Federation
							</p>
						</div>
					</div>

					<div className=' justify-self-end'>
						<ul className=' space-y-1 '>
							<h2 className='font-semibold'>
								Quick <span className='text-gray-50'> Links</span>
							</h2>
							<li className='text-xs font-bold'>
								<Link href='/about-us' className='hover:text-white'>
									About Us
								</Link>
							</li>
							<li className=' text-xs font-bold'>
								<Link href='/privacy-policy' className='hover:text-white'>
									Privacy & Policy
								</Link>
							</li>
							<li className=' text-xs font-bold'>
								<Link href='/terms-conditions' className='hover:text-white'>
									Terms & Conditions
								</Link>
							</li>

							<li className=' text-xs font-bold'>
								<Link href='/faq' className='hover:text-white'>
									FAQ
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div className=' py-4 bg-slate-950 mt-6'>
				<p className=' text-center text-white text-xs'>
					© 2025 HTX Trade. All Rights Reserved.
				</p>
			</div>
		</div>
	);
};

export default Footer;
