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
		title: 'Telegram Group',
		icon: null,
		iconImg: TelegramIcon,
		link: 'https://t.me/+PKSJt3V8foo3NTU1',
	},
	{
		id: 2,
		title: 'Telegram Channel',
		icon: null,
		iconImg: TelegramIcon,
		link: 'https://t.me/+FDXUZi2OglM3MGY1',
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
				<div className='bg-muted p-2 w-full mt-6 mx-auto text-xs rounded-md py-4'>
					<p>
						📢 Everything You Need — All HTX Trade Info in One Place! By joining
						our Telegram Channel & Group, you’ll get:
					</p>
					<ul className='list-none text-[0.70rem] list-inside space-y-2 mt-2'>
						<li>🔹 All company updates – features, announcements & changes</li>
						<li>
							🔹 Trade signals & analysis – expert ideas and real-time guidance
						</li>
						<li>
							🔹 Special offers, bonuses & campaigns – be the first to know
						</li>
						<li>🔹 Community Q&A and discussion</li>
						<li>🔹 Secure and trusted source of information.</li>
					</ul>

					<p>
						📲 Don’t miss out on anything important — join the channel and group
						now.
					</p>
					<p>
						🎯 Make your trading smarter, more informed, and more successful —
						HTX Trade is here to help!
					</p>
				</div>
			</div>
		</div>
	);
};

export default SupportPage;
