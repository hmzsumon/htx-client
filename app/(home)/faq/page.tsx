import Container from '@/components/layout/Container';
import React from 'react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

const faqData = [
	{
		id: 1,
		question: 'What is Live Trade on HTX Trade?',
		answer: [
			'Live Trade on HTX Trade allows you to participate in real-time trading markets, enabling instant buy and sell actions. You can monitor live market data, analyze trends, and execute trades seamlessly to maximize your trading opportunities.',
		],
	},
	{
		id: 2,
		question: 'How does Global Trade work on HTX Trade?',
		answer: [
			'Global Trade on HTX Trade provides access to international markets, allowing you to trade assets from different countries and regions. This feature helps diversify your portfolio and take advantage of global market trends.',
		],
	},
	{
		id: 3,
		question: 'What is Signal Trade and how can I use it?',
		answer: [
			'Signal Trade offers curated trade signals based on market analysis by professional traders. These signals guide you on when to enter or exit trades, helping you make informed trading decisions.',
			'To use Signal Trade, simply subscribe to the service, receive trade signals, and execute them directly on our platform.',
		],
	},
	{
		id: 4,
		question: 'What types of assets can I trade on HTX Trade?',
		answer: [
			'HTX Trade supports a wide range of assets including stocks, cryptocurrencies, forex, commodities, and indices. This variety allows you to create a diversified investment portfolio and explore different trading strategies.',
		],
	},
	{
		id: 5,
		question: 'How can I start trading on HTX Trade?',
		answer: [
			'Getting started is simple: ',
			'1. Create an account on HTX Trade.',
			'2. Complete the verification process.',
			'3. Deposit funds using your preferred method.',
			'4. Choose your trading option: Live Trade, Global Trade, or Signal Trade.',
			'5. Start trading and managing your investments.',
		],
	},
	{
		id: 6,
		question: 'Is there a minimum investment amount required?',
		answer: [
			'Yes, the minimum investment amount varies depending on the asset class. Typically, you can start trading with as low as $40. Please check specific trade requirements on the platform for detailed information.',
		],
	},
	{
		id: 7,
		question: 'How secure is my data and funds on HTX Trade?',
		answer: [
			'HTX Trade uses advanced security measures including encryption, two-factor authentication (2FA), and regular security audits to ensure your data and funds are safe. Our platform complies with international security standards to provide a secure trading environment.',
		],
	},
	{
		id: 8,
		question: 'Can I use HTX Trade on mobile devices?',
		answer: [
			'Yes, HTX Trade offers a fully responsive web platform and a dedicated mobile app (available for iOS and Android). This allows you to trade anytime, anywhere, and monitor your investments on the go.',
		],
	},
	{
		id: 9,
		question: 'What are the trading fees on HTX Trade?',
		answer: [
			'HTX Trade offers competitive trading fees, including low transaction costs and no hidden charges. Detailed information about our fee structure is available on the Fees page of our website.',
		],
	},
	{
		id: 10,
		question: 'How can I contact HTX Trade support?',
		answer: [
			'You can reach our support team 24/7 via live chat, email at support@htxtrade.org, or by using the support form on our website. Our dedicated team is ready to assist you with any inquiries or issues.',
		],
	},
	{
		id: 11,
		question: 'What is the minimum deposit and withdrawal amount on HTX Trade?',
		answer: [
			'The minimum deposit and withdrawal amount on HTX Trade is 40 USDT. This ensures accessibility while maintaining platform efficiency. Please ensure that network fees are considered when initiating transactions to avoid delays or errors.',
		],
	},
	{
		id: 12,
		question: 'Can I withdraw my capital from HTX Trade?',
		answer: [
			'Yes, you can withdraw your capital at any time on HTX Trade. Our platform allows hassle-free withdrawals, ensuring you have access to your funds whenever needed. Please note that the minimum withdrawal amount is 40 USDT, and ensure your account meets all verification requirements for smooth transactions.',
		],
	},
];

const Faq = () => {
	return (
		<div>
			<Container>
				<h1 className='text-2xl font-bold mb-4'>FAQ</h1>
				<Accordion type='single' collapsible className='w-full'>
					{faqData.map((faq) => (
						<AccordionItem key={faq.id} value={`item-${faq.id}`}>
							<AccordionTrigger>{faq.question}</AccordionTrigger>
							<AccordionContent>
								{faq.answer.map((text, index) => (
									<p key={index} className='mb-2'>
										{text}
									</p>
								))}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</Container>
		</div>
	);
};

export default Faq;
