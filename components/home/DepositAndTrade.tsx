import React from 'react';
import Image from 'next/image';
import TradeIcon from '@/public/images/icons/trade_1.png';
import ShareIcon from '@/public/images/icons/share.png';
import IndicesIcon from '@/public/images/icons/indices.png';

const DepositAndTrade = () => {
	return (
		<div className='space-y-6 px-4'>
			<div className='flex flex-col gap-4 items-center'>
				<div className='flex flex-col gap-2 items-center '>
					<h1 className='text-xl font-bold'>Deposit and Trade</h1>
					<div className='bg-htx-blue w-[80px] h-1'></div>
				</div>
				<div>
					<p className='text-sm text-gray-500 text-center'>
						Select your preferred payment method, deposit a minimum of $10 into
						your trading account, and start trading your favorite assets!
					</p>
				</div>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				<div className='bg-[#FFF3E2] py-4 px-2 rounded-lg flex flex-col gap-4 items-center justify-center'>
					<Image src={TradeIcon} alt='icon' className='w-16 mx-auto' />
					<h2>Trade</h2>
					<p>
						Trade global currencies with low spreads and high liquidity to
						capitalize on trade fluctuations.
					</p>
				</div>

				<div className='bg-[#DEEDFD] py-4 px-2 rounded-lg flex flex-col gap-4 items-center justify-center'>
					<Image src={ShareIcon} alt='icon' className='w-16 mx-auto' />
					<h2>Trade</h2>
					<p>
						Invest in real trade platform from leading companies and diversity
						your portfolio for long term growth. And you share the continuity of
						your income with others
					</p>
				</div>

				<div className='bg-[#D5F1E4] py-4 px-2 rounded-lg flex flex-col gap-4 items-center justify-center'>
					<Image src={IndicesIcon} alt='icon' className='w-16 mx-auto' />
					<h2>Trade</h2>
					<p>
						Trade major market indices like the BTC, ETH, BNB and SOL to track
						broad market movements and trends.
					</p>
				</div>
			</div>
		</div>
	);
};

export default DepositAndTrade;
