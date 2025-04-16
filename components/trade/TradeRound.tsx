'use client';
import { useGetTradeRoundHistoryQuery } from '@/redux/features/trade/tradeApi';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import RoundHistory from './RoundHistory';
import ActiveRound from './ActiveRound';
import TradeDrawer from './TradeDrawer';
import { ChevronRight } from 'lucide-react';
import MyTradeHistory from './MyTradeHistory';
import { formatBalance } from '@/lib/functions';
import Link from 'next/link';

const TradeRound = () => {
	const { user } = useSelector((state: any) => state.auth); // Assuming you have a Redux store set up

	const [activeHistory, setActiveHistory] = useState<any>(1);

	// active history handler
	const handleActiveHistory = (id: number) => {
		setActiveHistory(id);
	};

	return (
		<div className='w-full mx-auto px-1 py-2'>
			<div className='bg-white shadow px-1 py-2 rounded'>
				<div>
					<h2 className='text-xs font-semibold mb-1  text-center'>
						Balance: {formatBalance(user?.m_balance) || 0} USDT
					</h2>
				</div>
				<ActiveRound />
				<div className='flex items-center justify-between px-2 text-xs font-bold py-2 bg-gray-200 mt-2 '>
					<div className='flex items-center gap-2 text-gray-700'>
						<button
							onClick={() => handleActiveHistory(1)}
							className={`${
								activeHistory === 1 ? 'text-green-500 font-bold' : ''
							} text-xs`}
						>
							Trade Records
						</button>
						<button
							onClick={() => handleActiveHistory(2)}
							className={`${
								activeHistory === 2 ? 'text-green-500 font-bold' : ''
							} text-xs`}
						>
							My Trades
						</button>
					</div>
					<Link
						href='/trade/all-trade-history'
						className='flex items-center gap-1 cursor-pointer'
					>
						<span>More</span>
						<span>
							<ChevronRight size={18} />
						</span>
					</Link>
				</div>
				{/* Trade Records and My Trades Section */}
				{activeHistory === 1 ? (
					<div className=''>
						<RoundHistory />
					</div>
				) : (
					<div className=' '>
						<MyTradeHistory />
					</div>
				)}

				<TradeDrawer />
			</div>
		</div>
	);
};

export default TradeRound;
