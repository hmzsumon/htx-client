import RankPageTemplate from '@/components/rank-rewards/RankPageTemplate';
import React from 'react';
import Sustainer from '@/lib/icons/RoyaltyIcon';

const SustainerRankPage = () => {
	return (
		<div className='earner-wrapper pb-[7rem] md:pb-60'>
			<RankPageTemplate
				icon={<Sustainer width={150} height={150} />}
				title='Sustainer'
				conditions={[
					{
						title: 'Three (3) members must attain the "Gainer" rank.',
						value: 3,
						achieve: 0,
						symbol: '👥',
					},
				]}
				conditions2={[
					{
						title: 'Team "A" New Sales',
						value: 15000,
						achieve: 0,
						symbol: '$',
						progressBarColor: 'green',
						progressBar: 20,
					},
					{
						title: 'Team Total New Sales',
						value: 35000,
						achieve: 0,
						symbol: '$',
						progressBarColor: 'orange',
						progressBar: 10,
					},
				]}
				salary={8000}
			/>
		</div>
	);
};

export default SustainerRankPage;
