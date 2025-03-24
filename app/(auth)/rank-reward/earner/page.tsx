import RankPageTemplate from '@/components/rank-rewards/RankPageTemplate';
import React from 'react';
import EarnerIcon from '@/lib/icons/BronzeIcon';

const EarnerRankPage = () => {
	return (
		<div className='earner-wrapper pb-[7rem] md:pb-60'>
			<RankPageTemplate
				icon={<EarnerIcon width={150} height={150} />}
				title='Earner'
				conditions={[
					{ title: 'Team "A" Sales', value: 1000, achieve: 0, symbol: '$' },
					{ title: 'Team Total Sales', value: 10000, achieve: 0, symbol: '$' },
					{
						title: 'Team "A" Active Users',
						value: 15,
						achieve: 0,
						symbol: '👥',
					},
					{
						title: 'Team Total Active Users',
						value: 50,
						achieve: 0,
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
						progressBar: 20,
					},
					{
						title: 'Team Total New Sales',
						value: 6000,
						achieve: 0,
						symbol: '$',
						progressBarColor: 'orange',
						progressBar: 10,
					},
				]}
				salary={350}
			/>
		</div>
	);
};

export default EarnerRankPage;
