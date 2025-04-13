import React from 'react';
import Logo2 from '@/public/logo_1.png';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
	return (
		<div className='footer-wrapper pt-10 border-t border-t-primary/10 bg-htx-blue'>
			<div className=' px-4'>
				<div className=' flex gap-4 items-center justify-between '>
					<div className=' space-y-3 '>
						<Image src={Logo2} alt='logo' className=' w-32 ' />
						<div className=' text-xs font-semibold text-gray-100 space-y-1'>
							<p>
								26/1, Sofiyskaya Embankment, 117997, <br /> Moscow, Russian
								Federation.
							</p>
							<p> Portsdown,#12-01, Singapore 138507</p>
						</div>
					</div>

					<div className=' justify-self-end '>
						<ul className=' space-y-1 text-gray-800 '>
							<h2 className='font-bold text-gray-100'>
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
