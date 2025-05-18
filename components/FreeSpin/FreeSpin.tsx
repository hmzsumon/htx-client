'use client';

import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import confetti from 'canvas-confetti';
import Image from 'next/image';
import './Wheel.css';
import { useClaimSpinPrizeMutation } from '@/redux/features/auth/authApi';

interface SpinWheelProps {
	forcePrize?: string;
	spainId?: string;
}

const grayBlur = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...'; // cropped for clarity

const angleMap: Record<string, number> = {
	Again: 0,
	'1$': 340,
	'3$': 317,
	'5$': 294,
	'8$': 272,
	'15$': 249,
	'38$': 227,
	'88$': 205,
	'188$': 182,
	'388$': 158,
	'588$': 136,
	'888$': 115,
	'1888$': 92,
	'2888$': 69,
	'5888$': 46,
	'8888$': 23,
};

const FreeSpin: React.FC<SpinWheelProps> = ({ forcePrize, spainId }) => {
	const { user } = useSelector((state: any) => state.auth);
	const [claimSpinPrize] = useClaimSpinPrizeMutation();

	const [isSpinning, setIsSpinning] = useState(false);
	const [result, setResult] = useState<string | null>(null);
	const [showBigWin, setShowBigWin] = useState(false);
	const wheelRef = useRef<HTMLDivElement | null>(null);

	const handleClaimSpinPrize = async () => {
		if (spainId) {
			await claimSpinPrize({ spinPrizeId: spainId });
		}
	};

	const spinWheel = () => {
		if (isSpinning) return;
		setIsSpinning(true);
		setResult(null);
		setShowBigWin(false);

		const finalPrize = forcePrize || '1$';
		const angle = angleMap[finalPrize];
		const totalRotation = 360 * 10 + angle;

		if (wheelRef.current) {
			wheelRef.current.style.transition = 'none';
			wheelRef.current.style.transform = 'rotate(0deg)';
		}

		setTimeout(() => {
			if (wheelRef.current) {
				wheelRef.current.style.transition = 'transform 4s ease-out';
				wheelRef.current.style.transform = `rotate(${totalRotation}deg)`;
			}

			setTimeout(() => {
				setResult(`🎉 You got: ${finalPrize}`);
				setIsSpinning(false);

				confetti({
					particleCount: 100,
					spread: 90,
					origin: { y: 0.5 },
					colors: ['#FFD700', '#FF0000', '#00FF00'],
				});

				if (['888$', '1888$', '2888$', '5888$', '8888$'].includes(finalPrize)) {
					setShowBigWin(true);
				}

				handleClaimSpinPrize();
			}, 4000);
		}, 50);
	};

	return (
		<div className='flex flex-col items-center justify-center px-4'>
			<div className='relative w-60 h-60'>
				<div className='absolute inset-0 glow-border z-30 pointer-events-none'></div>

				<div
					ref={wheelRef}
					className='absolute w-full h-full z-50 rounded-full rotating-wheel'
				>
					<Image
						src='/spin/frame.png'
						alt='Frame'
						fill
						placeholder='blur'
						blurDataURL={grayBlur}
						style={{ objectFit: 'contain' }}
						className='z-10 pointer-events-none'
					/>
					<Image
						src='/spin/wheel.png'
						alt='Wheel'
						fill
						placeholder='blur'
						blurDataURL={grayBlur}
						style={{ objectFit: 'contain' }}
						className='z-0 pointer-events-none'
					/>
				</div>

				<Image
					src='/spin/pin.png'
					alt='Pin'
					width={64}
					height={64}
					placeholder='blur'
					blurDataURL={grayBlur}
					className='absolute top-[23%] left-[38%] z-50'
				/>
			</div>

			<Button
				onClick={spinWheel}
				disabled={isSpinning || user?.is_free_spin === false}
				className={`mt-6 w-full ${
					isSpinning
						? 'bg-gray-400 cursor-not-allowed'
						: 'bg-yellow-500 hover:bg-yellow-600'
				} text-white font-bold transition-all`}
			>
				{isSpinning ? 'Spinning...' : 'Spin Now'}
			</Button>

			<p className='mt-4 text-sm font-bold text-yellow-600 text-center'>
				{result ? result : 'Spin to see your prize!'}
			</p>
		</div>
	);
};

export default FreeSpin;
