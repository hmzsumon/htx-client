'use client';
import LinkCard from '@/components/promotion/LinkCard';
import { TeamViewCard } from '@/components/promotion/TeamViewCard';

import { Card } from '@/components/ui/card';
import UserInfo from '@/components/UserInfo';
import { useGetMyPromotionDataQuery } from '@/redux/features/auth/authApi';
import React from 'react';

const PromotionPage = () => {
	const { data, isLoading } = useGetMyPromotionDataQuery(undefined);
	const { promotionData } = data || {};

	return (
		<div className='relative pb-20'>
			<div className='promotion-wrapper h-[300px] px-1 '>
				<div className='p-2'>
					<UserInfo />
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
										<span className=' col-span-2'>
											{promotionData?.direct_register_users || 0}{' '}
											<span>🧑‍🤝‍🧑</span>
										</span>
									</li>
									<li className='grid grid-cols-6 gap-2'>
										<span className=' col-span-3'>Deposit Count</span>
										<span className=' col-span-1'>:</span>
										<span className=' col-span-2'>
											{promotionData?.direct_today_sales_count || 0}{' '}
											<span>💰</span>
										</span>
									</li>

									<li className='grid grid-cols-6 gap-2'>
										<span className=' col-span-3'>Deposit Amount</span>
										<span className=' col-span-1'>:</span>
										<span className=' col-span-2'>
											{promotionData?.direct_today_sales_amount || 0}{' '}
											<span>💵</span>
										</span>
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
										<span className=' col-span-2'>
											{promotionData?.team_today_users || 0} <span>🧑‍🤝‍🧑</span>
										</span>
									</li>
									<li className='grid grid-cols-6 gap-2'>
										<span className=' col-span-3'>Deposit Count</span>
										<span className=' col-span-1'>:</span>
										<span className=' col-span-2'>
											{promotionData?.team_today_sales_count || 0}{' '}
											<span>💰</span>
										</span>
									</li>

									<li className='grid grid-cols-6 gap-2'>
										<span className=' col-span-3'>Deposit Amount</span>
										<span className=' col-span-1'>:</span>
										<span className=' col-span-2'>
											{promotionData?.team_today_sales_amount || 0}{' '}
											<span>💵</span>
										</span>
									</li>
								</div>
							</div>
						</div>
					</Card>
				</div>
			</div>
			<div className='mt-32 md:mt-5 space-y-4 px-1'>
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
