import React from 'react';
import { clsx } from 'clsx';

const StartWithHTX = () => {
	return (
		<div className='bg-[#09074F]'>
			<div className='py-4'>
				<div className='space-y-4 '>
					<h2 className='text-white text-center text-xs'>
						Start trading with HTX Trade
					</h2>
					<h1 className='text-xl text-white font-bold text-center'>
						Quick and easy account setup in 3 simple steps.
					</h1>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-4 p-4'>
					<div className='  flex flex-col items-center justify-center space-y-1'>
						<div className='flex items-center justify-center h-12 w-12 rounded-full bg-green-500 text-white'>
							<span className='font-bold'>1</span>
						</div>
						<h2 className='text-white'>Register</h2>
						<p className='text-gray-400 text-center text-xs'>
							Begin your trading journey by creating your account.
						</p>
					</div>

					<div className='  flex flex-col items-center justify-center space-y-1'>
						<div className='flex items-center justify-center h-12 w-12 rounded-full bg-green-500 text-white'>
							<span className='font-bold'>2</span>
						</div>
						<h2 className='text-white'>Deposit</h2>
						<p className='text-gray-400 text-center text-xs'>
							Securely fund your account to prepare for live trading.
						</p>
					</div>

					<div className='  flex flex-col items-center justify-center space-y-1'>
						<div className='flex items-center justify-center h-12 w-12 rounded-full bg-green-500 text-white'>
							<span className='font-bold'>3</span>
						</div>
						<h2 className='text-white'>Trade</h2>
						<p className='text-gray-400 text-center text-xs'>
							Start trading with confidence and work toward your financial
							goals.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StartWithHTX;
