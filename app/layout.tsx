import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import StoreProvider from './StoreProvider';
import SocketProvider from '@/providers/SocketProvider';
import Head from 'next/head';

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
			<Head>
				<link rel='manifest' href='/manifest.json' />
				<link rel='icon' href='/icon-192x192.png' />
				<meta name='theme-color' content='#0f172a' />
				<meta name='apple-mobile-web-app-capable' content='yes' />
				<meta name='apple-mobile-web-app-title' content='HTX TRADE' />
				<link rel='apple-touch-icon' href='/icon-192x192.png' />
			</Head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				suppressHydrationWarning={true}
			>
				<StoreProvider>
					<SocketProvider>
						{/* <div className='main'></div> */}
						<div className='flex flex-col  bg-wrapper  '>{children}</div>
						<Toaster />
					</SocketProvider>
				</StoreProvider>
			</body>
		</html>
	);
}
