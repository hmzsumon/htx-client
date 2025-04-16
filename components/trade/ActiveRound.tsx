'use client';
import React, { useEffect, useState } from 'react';
import Countdown from './Countdown';
import { useSelector } from 'react-redux';

interface RoundData {
	endTime: string;
	issueId: string;
}

const ActiveRound = () => {
	const [activeRound, setActiveRound] = useState<RoundData | null>(null);

	const { symbol, tradeDuration, currentRounds } = useSelector(
		(state: any) => state.trade
	);

	useEffect(() => {
		//find active round from currentRounds by tradeDuration and symbol
		const activeRound = currentRounds[tradeDuration]?.[symbol];
		if (activeRound) {
			setActiveRound(activeRound);
		} else {
			setActiveRound(null);
		}
	}, [currentRounds, symbol, tradeDuration]);

	return (
		<div className='text-xs font-bold bg-gray-100 px-1 py-2 text-gray-800 rounded'>
			{activeRound ? (
				<div className='flex items-center justify-between'>
					<p>
						This Round:{' '}
						<span className='text-green-500'>{activeRound.issueId}</span>
					</p>
					<Countdown endTime={activeRound.endTime} />
				</div>
			) : (
				<p>Waiting for round info...</p>
			)}
		</div>
	);
};

export default ActiveRound;
