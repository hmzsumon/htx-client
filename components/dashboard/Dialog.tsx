'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useSelector } from 'react-redux';

export function DashboardDialog() {
	const { user } = useSelector((state: any) => state.auth);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (user) {
			const hasSeen = localStorage.getItem('hasSeenDashboardDialog');
			if (!hasSeen) {
				setOpen(true);
				localStorage.setItem('hasSeenDashboardDialog', 'true');
			}
		}
	}, [user]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className='max-w-[315px] max-h-[70vh] overflow-y-auto px-2 rounded-md'>
				<DialogHeader className='space-y-2 mt-2'>
					<DialogTitle className='text-sm font-bold text-center'>
						🚀 Official Announcement – HTX Company
					</DialogTitle>
					<DialogDescription className='text-center text-xs italic text-muted-foreground'>
						Exciting new journey starts with HTX Trade – Read the highlights
						below!
					</DialogDescription>
				</DialogHeader>

				<div className='space-y-3 mt-2 text-xs '>
					<p className='text-center '>
						With your unwavering trust and support,{' '}
						<span className='font-semibold text-primary'>HTX Company</span> has
						been operating successfully as a reliable crypto exchanger for a
						long time.
					</p>

					<p>
						We are proud to introduce our newest venture:
						<span className='font-semibold text-primary'> “HTX Trade”</span> –
						launching very soon!
					</p>

					<div className='bg-muted p-2 text-xs rounded-md'>
						<h3 className='font-semibold mb-2'>
							🎯 What You’ll Get at HTX Trade
						</h3>
						<ul className='list-none text-[0.70rem] list-inside space-y-2'>
							<li>⚡ Live & Signal-Based Trading Support</li>
							<li>📦 Flexible Earning Packages Based on Ranks</li>
							<li>⬆ Rank Up & Earn Massive Rewards</li>
							<li>🎁 Sign-Up Bonus: $2 for Every New User</li>
							<li>✅ Additional $2 Bonus Upon KYC Verification (Optional)</li>
						</ul>
					</div>

					<p>
						Our team of professional crypto traders will provide daily trading
						signals and analysis across various coins directly on our official
						groups and channels.
					</p>

					<p>
						They are committed to offering real-time insights and strategic
						support to help you make informed decisions and maximize your profit
						potential.
					</p>

					<p>
						More earning opportunities are also available and explained in
						detail in our official PDF guide.
					</p>

					<div className='bg-muted px-4 py-3 rounded-lg'>
						<p className='font-semibold'>🎯 Our Mission:</p>
						<p>
							To build a transparent, profitable, and growth-oriented trading
							ecosystem where every user becomes a part of something bigger.
						</p>
					</div>

					<p className='font-medium text-center text-primary mt-6'>
						Let’s begin this journey together — <br />
						<span className='italic'>"Trust the Trade, Grow with HTX"</span>
					</p>
				</div>

				<DialogFooter className='mt-4'>
					<Button onClick={() => setOpen(false)}>Got it!</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
