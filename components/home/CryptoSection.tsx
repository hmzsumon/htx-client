import React from 'react';
import Banner from '../Banner/Banner';
import CoinsTable from '../CoinsTable';
import CryptoContext from '@/providers/CryptoContext';

const CryptoSection = () => {
	return (
		<>
			<Banner />
			<CoinsTable />
		</>
	);
};

export default CryptoSection;
