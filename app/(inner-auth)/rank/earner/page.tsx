'use client';
import RankPageTemplate from '@/components/rank-rewards/RankPageTemplate';
import React from 'react';
import EarnerIcon from '@/lib/icons/BronzeIcon';
import { useInnerContext } from '@/context/InnerContext';

const EarnerRankPage = () => {
	const context = useInnerContext();
	const { team_a, team_a_sales, total_sales, total_active_member } =
		context || {};
	return (
		<div className='earner-wrapper  '>
			<RankPageTemplate
				icon={<EarnerIcon width={150} height={150} />}
				title='Earner'
				conditions={[
					{
						title: 'Team "A" Sales',
						value: 1000,
						achieve: team_a_sales,
						symbol: '$',
					},
					{
						title: 'Team Total Sales',
						value: 10000,
						achieve: total_sales,
						symbol: '$',
					},
					{
						title: 'Team "A" Active Users',
						value: 15,
						achieve: team_a,
						symbol: '👥',
					},
					{
						title: 'Team Total Active Users',
						value: 50,
						achieve: total_active_member,
						symbol: '👥',
					},
				]}
				conditions2={[
					{
						title: 'Team "A" New Sales',
						value: 1000,
						achieve: 0,
						symbol: '$',
						progressBarColor: 'green',
						progressBar: 0,
					},
					{
						title: 'Team Total New Sales',
						value: 6000,
						achieve: 0,
						symbol: '$',
						progressBarColor: 'orange',
						progressBar: 0,
					},
				]}
				salary={350}
			/>
		</div>
	);
};

export default EarnerRankPage;
