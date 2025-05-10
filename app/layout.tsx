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
	icons: {
		icon: '/icon-512x512.png',
	},

	manifest: '/manifest.json',

	// verification: {
	// 	google:
	// 		'google-site-verification=8v0x1a2g3h4j5k6l7m8n9o0p1q2r3s4t5u6v7w8x9y0z',
	// },
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
						{/* <div className='main'></div> */}
						<div className='flex flex-col  bg-wrapper  '>{children}</div>
						<Toaster />
					</SocketProvider>
				</StoreProvider>
			</body>
		</html>
	);
}
