import React from 'react';
import { Card } from '../ui/card';
import Image from 'next/image';
import Inbox from '@/public/images/icons/inbox.png';
import Gift from '@/public/images/icons/gift-box.png';
import Statistic from '@/public/images/icons/statistics.png';
import language from '@/public/images/icons/language.png';
import { ChevronRight } from 'lucide-react';

const MenuCard2 = () => {
	return (
		<div className='px-2 '>
			<Card className='p-4 bg-gray-50'>
				<div className=' list-none'>
					<li className='flex items-center justify-between gap-2'>
						<div className='flex items-center gap-2 text-xs font-bold'>
							<Image src={Inbox} alt='Inbox' className=' w-8' />
							<span>Notification</span>
						</div>
						<div>
							<ChevronRight className=' hover:scale-150 transition-all cursor-pointer' />
						</div>
					</li>
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
