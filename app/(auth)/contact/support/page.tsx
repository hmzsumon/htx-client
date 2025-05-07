import AnnouncementBanner from '@/components/home/AnnouncementBanner';
import SimpleSlider from '@/components/home/Carousel';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import TelegramIcon from '@/public/images/icons/telegram.png';
import WhatsappIcon from '@/public/images/icons/whatsapp.png';

const items = [
	{
		id: 1,
		title: 'Telegram',
		icon: null,
		iconImg: TelegramIcon,
		link: 'https://t.me/HTXAdmin82',
	},
	{
		id: 2,
		title: 'Whatsapp',
		icon: null,
		iconImg: WhatsappIcon,
		link: 'https://wa.me/message/WTMFTV5MPMGWL1',
	},
];
const SupportPage = () => {
	return (
		<div className='space-y-10 pb-20 min-h-[80vh] bg-[#E6DDEC]'>
			<div>
				<SimpleSlider />
				<AnnouncementBanner />
			</div>
			<div className='px-2 mt-10'>
				<div className='grid md:grid-cols-2 gap-4 mt-4'>
					{items.map((item: any) => (
						<a
							key={item.id}
							href={item?.link}
							target='_blank'
							rel='noopener noreferrer'
							className='no-underline'
						>
							<li
								className={`list-none flex flex-col items-center gap-1  p-2 rounded-md shadow-sm relative ${
									item.is_active ? ' bg-pink-200' : 'bg-white'
								}`}
							>
								{item.is_active && (
									<span className=' absolute top-0 right-0 font-semibold text-sm text-green-500'>
										⚡
									</span>
								)}

								{item.iconImg ? (
									<Image
										src={item.iconImg}
										alt='icon'
										className='w-8 h-8 object-contain'
									/>
								) : item.icon ? (
									<item.icon size={20} /> // ✅ Ensure this is a component, not a function
								) : null}
								<p className='text-[.70rem] font-semibold text-blue-900'>
									{item.title}
								</p>
							</li>
						</a>
					))}
				</div>
				<div className='bg-muted p-2 w-full mt-6 mx-auto text-sm rounded-md py-4'>
					<p>
						📞 Need Help? Chat Directly with Our Official Company Admin! For any
						questions or support, reach out to the HTX Trade-appointed admin
						now.
					</p>
					<ul className='list-none text-xs list-inside space-y-1 mt-2'>
						<li>⚡ Live & Signal-Based Trading Support</li>
						<li>⚡ Exclusive Promotions & Bonuses</li>
						<li>⚡ Instant Updates on New Features</li>
						<li>⚡ 24/7 Customer Support</li>
						<li>⚡ Community Engagement & Feedback</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default SupportPage;
