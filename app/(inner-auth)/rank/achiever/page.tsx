import RankPageTemplate from '@/components/rank-rewards/RankPageTemplate';
import React from 'react';
import Achiever from '@/lib/icons/GoldIcon';

const AchieverRankPage = () => {
	return (
		<div className='earner-wrapper '>
			<RankPageTemplate
				icon={<Achiever width={150} height={150} />}
				title='Achiever'
				conditions={[
					{
						title: 'Three members of Team "A" must achieve the "Earner" rank.',
						value: 3,
						achieve: 0,
						symbol: '👥',
					},
				]}
				conditions2={[
					{
						title: 'Team "A" New Sales',
						value: 2000,
						achieve: 0,
						symbol: '$',
						progressBarColor: 'green',
						progressBar: 20,
					},
					{
						title: 'Team Total New Sales',
						value: 10000,
						achieve: 0,
						symbol: '$',
						progressBarColor: 'orange',
						progressBar: 10,
					},
				]}
				salary={750}
			/>
		</div>
	);
};

export default AchieverRankPage;
