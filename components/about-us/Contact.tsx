import {
	BadgePercent,
	Handshake,
	MessageSquareHeart,
	MessageSquareQuote,
	MessageSquareShare,
} from 'lucide-react';
import React from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

const Contact = () => {
	return (
		<div className='px-4 py-10 bg-gray-50'>
			<div>
				<h1 className='text-3xl font-bold text-center'>Contact Us</h1>
			</div>
			<div className='grid md:grid-cols-3 gap-4 mt-6'>
				<div className='flex gap-3 items-center py-2 bg-gray-200 px-4 rounded-full'>
					<MessageSquareShare size={25} className='text-htx-blue' />
					<div>
						<h2 className='font-bold'>Business Inquiry</h2>
						<p className='text-xs text-gray-500'>service@htxtrade.org</p>
					</div>
				</div>

				<div className='flex gap-3 items-center py-2 bg-gray-200 px-4 rounded-full'>
					<BadgePercent size={25} className='text-htx-blue' />

					<div>
						<h2 className='font-bold'>Brand Cooperation</h2>
						<p className='text-xs text-gray-500'>info@htxtrade.org</p>
					</div>
				</div>

				<div className='flex gap-3 items-center py-2 bg-gray-200 px-4 rounded-full'>
					<Handshake size={25} className='text-htx-blue' />

					<div>
						<h2 className='font-bold'>Media Exchange</h2>
						<p className='text-xs text-gray-500'>support@htxtrade.org</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
