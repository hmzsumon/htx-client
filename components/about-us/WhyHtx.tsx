import { ChartCandlestick, Contrast, GlobeLock } from 'lucide-react';
import React from 'react';

const WhyHtx = () => {
	return (
		<div>
			<h1 className='text-3xl font-bold text-center'>Why HTX Trade?</h1>
			<div className=' grid md:grid-cols-3 mt-6 gap-4'>
				<div className='space-y-4 text-center'>
					<GlobeLock size={45} className='text-htx-blue mx-auto' />
					<div className='space-y-2'>
						<h2 className=' font-bold'>Top-notch Security</h2>
						<p className='text-xs font-semibold text-gray-600'>
							Globally recognized security experts for 24/7 protection
						</p>
					</div>
				</div>

				<div className='space-y-4 text-center'>
					<Contrast size={45} className='text-htx-blue mx-auto' />
					<div className='space-y-2'>
						<h2 className=' font-bold'>Diversified Cryptos</h2>
						<p className='text-xs font-semibold text-gray-600'>
							Offering a wealth of spot and derivative trading products spanning
							over 700 categories.
						</p>
					</div>
				</div>

				<div className='space-y-4 text-center'>
					<ChartCandlestick size={45} className='text-htx-blue mx-auto' />

					<div className='space-y-2'>
						<h2 className=' font-bold'>Robust Trading System</h2>
						<p className='text-xs font-semibold text-gray-600'>
							Ensure fast trading with deep markets
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WhyHtx;
