'use client';

import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { DialogClose } from '@radix-ui/react-dialog';
import { useSelector } from 'react-redux';
import confetti from 'canvas-confetti';
import Image from 'next/image';
import './Wheel.css';
import { useClaimSpinPrizeMutation } from '@/redux/features/auth/authApi';

interface DialogProps {
	forcePrize?: string;
	spainId?: string;
}
const grayBlur =
	'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhISEhISEhISEhISEhISEhISEhISEhISEhISKCggGBolGxISEjEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGy0lICYtLS8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAMIBAwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAEAAIDBQYBBwj/xAA8EAACAQIEAwYEBQMDBAMAAAABAhEAAwQSITEFBkFREyJhcYEygZGhscHR8RQjQlLh8BUjYnKCkqKywf/EABoBAQADAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAsEQACAgEEAQMEAgMAAAAAAAAAAQIRAwQSITETQVEyYXGBkaEFcaHh8P/aAAwDAQACEQMRAD8A3VQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/2Q==';

export function FreeSpinDialog({ forcePrize, spainId }: DialogProps) {
	const { user } = useSelector((state: any) => state.auth);

	const [claimSpinPrize, { isSuccess }] = useClaimSpinPrizeMutation();

	const [open, setOpen] = useState(false);
	const [isSpinning, setIsSpinning] = useState(false);
	const [result, setResult] = useState<string | null>(null);
	const [showBigWin, setShowBigWin] = useState(false);

	// handle claim spin prize
	const handleClaimSpinPrize = async () => {
		if (spainId) {
			await claimSpinPrize({ spinPrizeId: spainId });
		}
	};
	

	const wheelRef = useRef<HTMLDivElement | null>(null);
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
	const prizes = Object.keys(angleMap);

	useEffect(() => {
		setOpen(true);
	}, []);

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

				// 🎯 Claim the prize after spin completes
				handleClaimSpinPrize();
				setOpen(false);
			}, 4000);
		}, 50);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent
				className='max-w-[300px] max-h-[90vh] overflow-hidden px-2 wrapper rounded-md'
				style={{ animation: 'none' }}
			>
				{/* ❌ Close Button */}
				<DialogClose asChild>
					<button
						className='absolute top-2 right-2 p-2 rounded-full hover:bg-white/10 text-red-500 hover:text-red-600 transition-all'
						aria-label='Close'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={2}
							stroke='currentColor'
							className='w-5 h-5'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					</button>
				</DialogClose>

				<DialogHeader className='space-y-2 mt-2'>
					<DialogTitle className='text-sm font-bold text-center text-white'>
						🎁 Thanks for Your Deposit!
					</DialogTitle>
					<DialogDescription className='text-center text-xs italic text-white/80'>
						Spin the lucky wheel and claim your guaranteed bonus reward!
					</DialogDescription>
				</DialogHeader>

				{/* 🎯 Wheel Section */}
				<div className='flex flex-col items-center justify-center'>
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
						disabled={isSpinning}
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
			</DialogContent>
		</Dialog>
	);
}
