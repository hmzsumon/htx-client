import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import StoreProvider from './StoreProvider';
import SocketProvider from '@/providers/SocketProvider';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
	title: 'HTX Trade',
	description: 'HTX Trade is a platform for trading',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className='light'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				suppressHydrationWarning={true}
			>
				<StoreProvider>
					<SocketProvider>
						<div className='main'></div>
						<main className='flex flex-col min-h-screen bg-wrapper '>
							{children}
						</main>
						<Toaster />
					</SocketProvider>
				</StoreProvider>
			</body>
		</html>
	);
}
