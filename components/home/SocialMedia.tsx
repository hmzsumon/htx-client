import React from 'react';
import Container from '../layout/Container';
import TradeImg from '@/public/images/trade/trade_img_1.png';
import faceBook from '@/public/images/social/icon-facebook.svg';
import twitter from '@/public/images/social/icon-twitter.svg';
import instagram from '@/public/images/social/icon-instagram.svg';
import telegram from '@/public/images/social/icon-telegram.svg';
import youtube from '@/public/images/social/icon-youtube.svg';
import tiktok from '@/public/images/social/icon-tiktok.svg';
import Image from 'next/image';

const SocialMedia = () => {
	const socialMedia = [
		{ id: 1, icon: faceBook, link: '' },
		{ id: 2, icon: twitter, link: '' },
		{ id: 3, icon: instagram, link: '' },
		{ id: 4, icon: telegram, link: '' },
		{ id: 5, icon: youtube, link: '' },
		{ id: 6, icon: tiktok, link: '' },
	];
	return (
		<div>
			<Container>
				<h2 className='text-3xl font-bold text-center text-gray-800'>
					Follow Us on Social Media
				</h2>
				<div className='grid grid-cols-6 gap-4 mt-10'>
					{socialMedia.map((item) => (
						<div key={item.id} className='flex  items-center justify-center'>
							<Image
								src={item.icon}
								alt='social-media'
								width={40}
								height={40}
							/>
						</div>
					))}
				</div>
			</Container>
		</div>
	);
};

export default SocialMedia;
