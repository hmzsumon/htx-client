'use client';

import Image from 'next/image';
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from '@/components/ui/drawer';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSymbol } from '@/redux/features/trade/tradeSlice';

interface SymbolDrawerProps {
	open: boolean;
	setOpen: (open: boolean) => void;
}

const coins = [
	{ symbol: 'BTCUSDT', logo: '/images/icons/btc_icon.png' },
	{ symbol: 'ETHUSDT', logo: '/images/icons/eth_icon.png' },
	{ symbol: 'BNBUSDT', logo: '/images/icons/bnb_icon.png' },
	{ symbol: 'SOLUSDT', logo: '/images/icons/sol_icon.png' },
	{ symbol: 'TRUMPUSDT', logo: '/images/icons/trump_icon.png' },
	{ symbol: 'LTCUSDT', logo: '/images/icons/ltc_icon.png' },
];

export function SymbolDrawer({ open, setOpen }: SymbolDrawerProps) {
	const dispatch = useDispatch();
	const [prices, setPrices] = useState<any>({});

	const onSelect = (symbol: string) => {
		dispatch(setSymbol(symbol));
		console.log('Selected symbol:', symbol);
	};

	useEffect(() => {
		const fetchPrices = async () => {
			const response = await fetch(
				'https://api.binance.com/api/v3/ticker/24hr'
			);
			const data = await response.json();
			const selected = data.filter((item: any) =>
				coins.find((coin) => coin.symbol === item.symbol)
			);
			const formatted = selected.reduce((acc: any, cur: any) => {
				acc[cur.symbol] = {
					price: parseFloat(cur.lastPrice),
					change: parseFloat(cur.priceChangePercent),
				};
				return acc;
			}, {});
			setPrices(formatted);
		};
		fetchPrices();
	}, []);

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerContent className='max-h-[85vh] rounded-t-3xl'>
				<div className='mx-auto w-full px-4 py-2'>
					<DrawerHeader>
						<DrawerTitle className='text-lg text-gray-700'>
							Choose currency
						</DrawerTitle>
					</DrawerHeader>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Currency</TableHead>
								<TableHead className='text-right'>
									Latest price (USDT)
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{coins.map((coin) => {
								const priceData = prices[coin.symbol];
								return (
									<TableRow
										key={coin.symbol}
										onClick={() => {
											onSelect(coin.symbol);
											setOpen(false);
										}}
										className='cursor-pointer hover:bg-gray-100'
									>
										<TableCell className='flex items-center gap-3'>
											<Image
												src={coin.logo}
												alt={coin.symbol}
												width={28}
												height={28}
											/>
											<span className='font-medium text-sm'>{coin.symbol}</span>
										</TableCell>
										<TableCell className='text-right'>
											{priceData ? (
												<>
													<div className='text-sm font-semibold text-gray-800'>
														$
														{priceData.price.toLocaleString('en-US', {
															minimumFractionDigits: 2,
														})}
													</div>
													<div
														className={`text-xs ${
															priceData.change >= 0
																? 'text-green-500'
																: 'text-red-500'
														}`}
													>
														{priceData.change > 0 ? '+' : ''}
														{priceData.change.toFixed(2)}%
													</div>
												</>
											) : (
												<span className='text-xs text-gray-400'>
													Loading...
												</span>
											)}
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
