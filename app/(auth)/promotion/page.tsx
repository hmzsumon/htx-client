import LinkCard from '@/components/promotion/LinkCard';
import { TeamViewCard } from '@/components/promotion/TeamViewCard';

import { Card } from '@/components/ui/card';
import UserInfo from '@/components/UserInfo';
import React from 'react';

const PromotionPage = () => {
	return (
		<div className='relative pb-20'>
			<div className='promotion-wrapper h-[300px] px-4 '>
				<div className=' p-4'>
					<div>
						<UserInfo />
					</div>
				</div>
				<div className=' top-20 '>
					<Card className='p-4 bg-gray-100'>
						<div className='grid md:grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<div>
									<h2 className='font-bold text-xl text-blue-950'>
										Direct Subordinates
									</h2>
								</div>
								<hr className=' border-gray-400' />
								<div className=' list-none text-xs font-semibold space-y-1'>
									<li className='grid grid-cols-6 gap-2'>
										<span className=' col-span-3'>Register User</span>
										<span className=' col-span-1'>:</span>
										<span className=' col-span-2'> 100</span>
									</li>
									<li className='grid grid-cols-6 gap-2'>
										<span className=' col-span-3'>Deposit Count</span>
										<span className=' col-span-1'>:</span>
										<span className=' col-span-2'> 50</span>
									</li>

									<li className='grid grid-cols-6 gap-2'>
										<span className=' col-span-3'>Deposit Amount</span>
										<span className=' col-span-1'>:</span>
										<span className=' col-span-2'> $5000</span>
									</li>

									<li className='grid grid-cols-6 gap-2'>
										<span className=' col-span-3'>First Deposit User</span>
										<span className=' col-span-1'>:</span>
										<span className=' col-span-2'> 50</span>
									</li>
									<li className='grid grid-cols-6 gap-2'>
										<span className=' col-span-3'>First Deposit Amount</span>
										<span className=' col-span-1'>:</span>
										<span className=' col-span-2'> $50</span>
									</li>
								</div>
							</div>
							<div className='space-y-2'>
								<div>
									<h2 className='font-bold text-xl text-blue-950'>
										Team Subordinates
									</h2>
								</div>
								<hr className=' border-gray-400' />
								<div className=' list-none text-xs font-semibold space-y-1'>
									<li className='grid grid-cols-6 gap-2'>
										<span className=' col-span-3'>Register User</span>
										<span className=' col-span-1'>:</span>
										<span className=' col-span-2'> 100</span>
									</li>
									<li className='grid grid-cols-6 gap-2'>
										<span className=' col-span-3'>Deposit Count</span>
										<span className=' col-span-1'>:</span>
										<span className=' col-span-2'> 50</span>
									</li>

									<li className='grid grid-cols-6 gap-2'>
										<span className=' col-span-3'>Deposit Amount</span>
										<span className=' col-span-1'>:</span>
										<span className=' col-span-2'> $5000</span>
									</li>

									<li className='grid grid-cols-6 gap-2'>
										<span className=' col-span-3'>First Deposit User</span>
										<span className=' col-span-1'>:</span>
										<span className=' col-span-2'> 50</span>
									</li>
									<li className='grid grid-cols-6 gap-2'>
										<span className=' col-span-3'>First Deposit Amount</span>
										<span className=' col-span-1'>:</span>
										<span className=' col-span-2'> $50</span>
									</li>
								</div>
							</div>
						</div>
					</Card>
				</div>
			</div>
			<div className='mt-52 md:mt-16 space-y-4 px-4'>
				<LinkCard />

				<div className=''>
					<Card className='p-4 bg-[#24485E] text-white'>
						<div className=' flex items-center justify-between my-2 text-md font-bold'>
							<p>Team View</p>
						</div>
						<hr />
						<div>
							<TeamViewCard />
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default PromotionPage;
