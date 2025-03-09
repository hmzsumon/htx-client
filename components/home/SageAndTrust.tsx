import React from 'react';
import Container from '../layout/Container';
import TrustItem from './TrustItem';

const SageAndTrust = () => {
	return (
		<Container>
			<div>
				<h1 className='text-3xl font-bold text-center text-gray-800'>
					Your Safe and Trusted <br className='md:hidden' /> HTX Trade
				</h1>
				<div className='my-6 grid grid-cols-1 md:grid-cols-3 gap-6'>
					<TrustItem
						title='Secure Asset Storage'
						description={
							'Our industry-leading encryption and storage systems ensure that your assets are always safe and secure.'
						}
					/>
					<TrustItem
						title='Strong Account Security'
						description={
							'We adhere to the highest security standards and implement the strictest security practices to keep your account secure.'
						}
					/>
					<TrustItem
						title='Trusted Platform'
						description={
							'We have a secure-by-design foundation in place to ensure rapid detection and response to any cyber attacks.'
						}
					/>
				</div>
			</div>
		</Container>
	);
};

export default SageAndTrust;
