import React from 'react';
import Container from '../layout/Container';
import TrustItem from './TrustItem';
import { clsx } from 'clsx';

const SageAndTrust = () => {
	return (
		<Container>
			<div>
				<h1 className='text-[1.45rem] md:text-4xl font-bold text-center'>
					Your Safe and Trusted HTX Trade
				</h1>
				<div className='my-6 grid grid-cols-1 md:grid-cols-3 gap-6'>
					<TrustItem />
					<TrustItem />
					<TrustItem />
				</div>
			</div>
		</Container>
	);
};

export default SageAndTrust;
