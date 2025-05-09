import React from 'react';
import { FaCoins, FaUser, FaUsers } from 'react-icons/fa6';
import { Card } from '../ui/card';

const RankDataCard = ({ rankData, rank }: any) => {
	return (
		<div className=' '>
			<Card className='p-4 my-4 bg-slate-100'>
				<h2 className=' text-md font-bold capitalize text-gray-800'>
					My Rank: {rank}
				</h2>

				<div className=' my-3 space-y-2 text-xs font-semibold text-gray-800'>
					<div className='grid grid-cols-6'>
						<h4 className=' col-span-3'>Direct Refer users</h4>
						<p className=' col-span-1'>:</p>
						<p className=' col-span-1 flex items-center gap-2'>
							{rankData?.direct_refer_users || 0} <FaUser />
						</p>
					</div>

					<div className='grid grid-cols-6'>
						<h4 className=' col-span-3'>Total team Members</h4>
						<p className=' col-span-1'>:</p>
						<p className=' col-span-1 flex items-center gap-2'>
							{rankData?.total_team_members || 0} <FaUsers />
						</p>
					</div>

					<div className='grid grid-cols-6'>
						<h4 className=' col-span-3'>Sales Amount</h4>
						<p className=' col-span-1'>:</p>
						<p className=' col-span-1'>
							{rankData?.sales_amount ? `${rankData?.sales_amount}$` : '$0'}
						</p>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default RankDataCard;
