import RankPageTemplate from '@/components/rank-rewards/RankPageTemplate';
import React from 'react';
import Gainer from '@/lib/icons/RubyIcon';

const ClimberRankPage = () => {
	return (
		<div className='earner-wrapper '>
			<RankPageTemplate
				icon={<Gainer width={150} height={150} />}
				title='Gainer'
				conditions={[
					{
						title: 'Three (3) members must attain the "Climber" rank.',
						value: 3,
						achieve: 0,
						symbol: '👥',
					},
				]}
				conditions2={[
					{
						title: 'Team "A" New Sales',
						value: 7000,
						achieve: 0,
						symbol: '$',
						progressBarColor: 'green',
						progressBar: 0,
					},
					{
						title: 'Team Total New Sales',
						value: 25000,
						achieve: 0,
						symbol: '$',
						progressBarColor: 'orange',
						progressBar: 0,
					},
				]}
				salary={3500}
			/>
		</div>
	);
};

export default ClimberRankPage;
