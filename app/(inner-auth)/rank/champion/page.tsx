import RankPageTemplate from '@/components/rank-rewards/RankPageTemplate';
import React from 'react';
import Champion from '@/lib/icons/DiamondIcon';

const ChampionRankPage = () => {
	return (
		<div className='earner-wrapper '>
			<RankPageTemplate
				icon={<Champion width={150} height={150} />}
				title='Champion'
				conditions={[
					{
						title: 'Three (3) members must attain the "Sustainer" rank.',
						value: 3,
						achieve: 0,
						symbol: '👥',
					},
				]}
				conditions2={[
					{
						title: 'Team "A" New Sales.',
						value: 30000,
						achieve: 0,
						symbol: '$',
						progressBarColor: 'green',
						progressBar: 20,
					},
					{
						title: 'Team Total New Sales.',
						value: 80000,
						achieve: 0,
						symbol: '$',
						progressBarColor: 'orange',
						progressBar: 10,
					},
				]}
				salary={20000}
			/>
		</div>
	);
};

export default ChampionRankPage;
