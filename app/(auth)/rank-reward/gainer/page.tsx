import RankPageTemplate from '@/components/rank-rewards/RankPageTemplate';
import React from 'react';
import Gainer from '@/lib/icons/RubyIcon';

const ClimberRankPage = () => {
	return (
		<div className='earner-wrapper pb-[7rem] md:pb-60'>
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
						value: 10000,
						achieve: 0,
						symbol: '$',
						progressBarColor: 'green',
						progressBar: 20,
					},
					{
						title: 'Team Total New Sales',
						value: 20000,
						achieve: 0,
						symbol: '$',
						progressBarColor: 'orange',
						progressBar: 10,
					},
				]}
				salary={3500}
			/>
		</div>
	);
};

export default ClimberRankPage;
