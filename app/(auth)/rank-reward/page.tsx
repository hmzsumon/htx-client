'use client';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
	useGetMyRankRecordQuery,
	useGetRankCardDataQuery,
} from '@/redux/features/rank/rankApi';
import RankDataCard from '@/components/rank-rewards/RankDataCard';
import GridLoader from 'react-spinners/GridLoader';
import BronzeIcon from '@/lib/icons/BronzeIcon';
import GoldIcon from '@/lib/icons/GoldIcon';
import RubyIcon from '@/lib/icons/RubyIcon';
import RoyaltyIcon from '@/lib/icons/RoyaltyIcon';
import CrownIcon from '@/lib/icons/CrownIcon';
import DiamondIcon from '@/lib/icons/DiamondIcon';
import RankItemCard from '@/components/rank-rewards/RankItemCard';

const ranks = [
	{
		id: 1,
		icon: <BronzeIcon width={30} height={30} />,
		name: 'Earner',
		salary: 350,
		link: '/rank/earner',
	},
	{
		id: 2,
		icon: <GoldIcon width={30} height={30} />,
		name: 'Achiever',
		salary: 750,
		link: '/rank/achiever',
	},
	{
		id: 3,
		icon: <CrownIcon width={30} height={30} />,
		name: 'Climber',
		salary: 1600,
		link: '/rank/climber',
	},
	{
		id: 4,
		icon: <RubyIcon width={30} height={30} />,
		name: 'Gainer',
		salary: 3500,
		link: '/rank/gainer',
	},
	{
		id: 5,
		icon: <RoyaltyIcon width={30} height={30} />,
		name: 'Sustainer',
		salary: 8000,
		link: '/rank/sustainer',
	},
	{
		id: 6,
		icon: <DiamondIcon width={30} height={30} />,
		name: 'Champion',
		salary: 20000,
		link: '/rank/champion',
	},
];

const RankRewardPage = () => {
	const { user = {} } = useSelector((state: any) => state.auth);
	const { data = {}, isLoading } = useGetRankCardDataQuery(undefined);
	const { rankCardData: rankData = {} } = data;

	// Titan rank condition
	const titanCondition = { directRefer: 10, teamMembers: 30, salesValue: 3000 };
	const isTitanCondition = useMemo(
		() =>
			rankData.directReferUsers >= titanCondition.directRefer &&
			rankData.teamMembers >= titanCondition.teamMembers &&
			rankData.salesValue >= titanCondition.salesValue,
		[rankData]
	);

	return (
		<div className='promotion-wrapper pb-20'>
			<div className=''>
				<div className='  p-4 '>
					<div className='mt-1'>
						<RankDataCard rankData={rankData} rank={user.rank} />
					</div>
					<div>
						{isLoading ? (
							<div className='flex justify-center my-4'>
								<GridLoader size={25} color='#fff' />
							</div>
						) : (
							<div>
								<div className=' space-y-2'>
									{ranks.map((item) => (
										<RankItemCard key={item.id} item={item} />
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default RankRewardPage;
