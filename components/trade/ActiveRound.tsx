'use client';
import React, { useEffect, useState } from 'react';
import Countdown from './Countdown';

interface RoundData {
	endTime: string;
	issueId: string;
}

const ActiveRound = ({ activeRound }: { activeRound: RoundData | null }) => {
	const [storedRound, setStoredRound] = useState<RoundData | null>(null);

	useEffect(() => {
		// Save round to localStorage when it updates
		if (activeRound) {
			localStorage.setItem('activeRound', JSON.stringify(activeRound));
			setStoredRound(activeRound);
		} else {
			// Try to restore from localStorage
			const saved = localStorage.getItem('activeRound');
			if (saved) {
				const parsed = JSON.parse(saved);
				// validate time
				const now = new Date().getTime();
				const end = new Date(parsed.endTime).getTime();
				if (end > now) {
					setStoredRound(parsed);
				} else {
					localStorage.removeItem('activeRound');
				}
			}
		}
	}, [activeRound]);

	return (
		<div className='text-xs font-bold bg-gray-100 px-1 py-2 text-gray-800 rounded'>
			{storedRound ? (
				<div className='flex items-center justify-between'>
					<p>
						This Round:{' '}
						<span className='text-green-500'>{storedRound.issueId}</span>
					</p>
					<Countdown endTime={storedRound.endTime} />
				</div>
			) : (
				<p>Waiting for round info...</p>
			)}
		</div>
	);
};

export default ActiveRound;
