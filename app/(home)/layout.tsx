import React from 'react';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import CryptoContext from '@/providers/CryptoContext';
const HomeLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<div>
			<NavBar />
			<div className='flex flex-col min-h-[53vh] md:min-h-[61vh] '>
				<CryptoContext>{children}</CryptoContext>
			</div>
			<Footer />
		</div>
	);
};

export default HomeLayout;
