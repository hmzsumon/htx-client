import RankPageTemplate from '@/components/rank-rewards/RankPageTemplate';
import React from 'react';
import Climber from '@/lib/icons/CrownIcon';

const ClimberRankPage = () => {
	return (
		<div className='earner-wrapper pb-[7rem] md:pb-60'>
			<RankPageTemplate
				icon={<Climber width={150} height={150} />}
				title='Climber'
				conditions={[
					{
						title: 'Three (3) members must attain the "Achiever" rank.',
						value: 3,
						achieve: 0,
						symbol: '👥',
					},
				]}
				conditions2={[
					{
						title: 'Team "A" New Sales',
						value: 6000,
						achieve: 0,
						symbol: '$',
						progressBarColor: 'green',
						progressBar: 20,
					},
					{
						title: 'Team Total New Sales',
						value: 14000,
						achieve: 0,
						symbol: '$',
						progressBarColor: 'orange',
						progressBar: 10,
					},
				]}
				salary={1600}
			/>
		</div>
	);
};

export default ClimberRankPage;
