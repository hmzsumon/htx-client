import React from 'react';
import { Card } from '../ui/card';
import Image from 'next/image';
import Inbox from '@/public/images/icons/inbox.png';
import Transaction from '@/public/images/icons/transaction.png';
import Gift from '@/public/images/icons/gift-box.png';
import Statistic from '@/public/images/icons/statistics.png';
import language from '@/public/images/icons/language.png';
import SpinDeposit from '@/public/images/icons/spin_deposit.png';
import SpinRank from '@/public/images/icons/spin_rank.png';
import ImgKyc from '@/public/images/icons/kyc.png';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const MenuCard2 = () => {
	return (
		<div className='px-2 '>
			<Card className='p-4 bg-gray-50'>
				<div className=' list-none'>
					<Link href='/transactions'>
						<li className='flex items-center justify-between gap-2'>
							<div className='flex items-center gap-2 text-xs font-bold'>
								<Image src={Transaction} alt='Inbox' className=' w-8' />
								<span>Transactions</span>
							</div>
							<div>
								<ChevronRight className=' hover:scale-150 transition-all cursor-pointer' />
							</div>
						</li>
					</Link>
					<hr className='my-4' />
					<Link href='/notifications'>
						<li className='flex items-center justify-between gap-2'>
							<div className='flex items-center gap-2 text-xs font-bold'>
								<Image src={Inbox} alt='Inbox' className=' w-8' />
								<span>Notification</span>
							</div>
							<div>
								<ChevronRight className=' hover:scale-150 transition-all cursor-pointer' />
							</div>
						</li>
					</Link>
					<hr className='my-4' />

					<li className='flex items-center justify-between gap-2'>
						<div className='flex items-center gap-2 text-xs font-bold'>
							<Image src={SpinDeposit} alt='gift' className=' w-8' />

							<span>Free Spin on Deposit</span>
						</div>
						<div>
							<ChevronRight className=' hover:scale-150 transition-all cursor-pointer' />
						</div>
					</li>
					<hr className='my-4' />

					<li className='flex items-center justify-between gap-2'>
						<div className='flex items-center gap-2 text-xs font-bold'>
							<Image src={SpinRank} alt='gift' className=' w-8' />
							<span>Spin Reward for Rank</span>
						</div>
						<div>
							<ChevronRight className=' hover:scale-150 transition-all cursor-pointer' />
						</div>
					</li>
					<hr className='my-4' />

					<hr className='my-4' />

					<li className='flex items-center justify-between gap-2'>
						<div className='flex items-center gap-2 text-xs font-bold'>
							<Image src={Gift} alt='gift' className=' w-8' />
							<span>Gifts</span>
						</div>
						<div>
							<ChevronRight className=' hover:scale-150 transition-all cursor-pointer' />
						</div>
					</li>
					<hr className='my-4' />

					<li className='flex items-center justify-between gap-2'>
						<div className='flex items-center gap-2 text-xs font-bold'>
							<Image src={Statistic} alt='gift' className=' w-8' />
							<span>HTX statistics</span>
						</div>
						<div>
							<ChevronRight className=' hover:scale-150 transition-all cursor-pointer' />
						</div>
					</li>

					<hr className='my-4' />

					<li className='flex items-center justify-between gap-2'>
						<div className='flex items-center gap-2 text-xs font-bold'>
							<Image src={language} alt='gift' className=' w-8' />
							<span>Language</span>
						</div>
						<div>
							<ChevronRight className=' hover:scale-150 transition-all cursor-pointer' />
						</div>
					</li>
				</div>
			</Card>
		</div>
	);
};

export default MenuCard2;
