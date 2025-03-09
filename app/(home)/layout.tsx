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
			<div className='flex flex-col min-h-screen'>
				<CryptoContext>{children}</CryptoContext>
			</div>
			<Footer />
		</div>
	);
};

export default HomeLayout;
