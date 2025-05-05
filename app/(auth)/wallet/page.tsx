'use client';
import React from 'react';
import Image from 'next/image';
import ProfileImg from '@/public/images/profile-avatar/avatar_1.png';
import { formatBalance, maskEmail } from '@/lib/functions';
import { useSelector } from 'react-redux';
import CopyToClipboard from '@/lib/CopyToClipboard';
import { Card, CardContent } from '@/components/ui/card';
import UserInfo from '@/components/UserInfo';
import { IncomeTable } from '@/components/wallet/IncomeTable';
import { TeamIncomeTable } from '@/components/wallet/TeamIncomeTable';
import { IncentiveIncomeTable } from '@/components/wallet/IncentiveIncomeTable';
import { useMyWalletQuery } from '@/redux/features/auth/authApi';

const WalletPage = () => {
	const { user } = useSelector((state: any) => state.auth);
	const { data } = useMyWalletQuery(undefined);
	const { wallet } = data || {};

	return (
		<div className='pb-20'>
			<div className=' relative'>
				<div className='bg-[#00AB66] px-4 space-y-4 h-[40vh] rounded-b-3xl'>
					{/*Start Profile Upper Section */}
					<div>
						<UserInfo />
					</div>
					{/*End Profile Upper Section */}
				</div>

				{/* Start Card Section */}
				<div className='absolute top-[60%] w-full px-2'>
					<Card className='px-1 bg-gray-50'>
						<div className=' px-2 flex items-center justify-between my-2 text-sm font-bold'>
							<p>Main Balance :</p>
							<p>${formatBalance(user?.m_balance)}</p>
						</div>
						<hr />
						<div>
							<IncomeTable wallet={wallet} />
						</div>
					</Card>
				</div>
				{/* End Card Section */}
			</div>

			<div className='mt-32 space-y-4 px-2'>
				<div className=''>
					<Card className='px-1 bg-[#bbd4f8]'>
						<div className='px-2 flex items-center justify-between my-2 text-sm font-bold'>
							<div>
								<p>Team Income</p>
							</div>
						</div>
						<hr />
						<div>
							<TeamIncomeTable walletData={wallet} />
						</div>
					</Card>
				</div>

				<div className=''>
					<Card className='px-1 bg-[#24485E] text-white'>
						<div className='px-2 flex items-center justify-between my-2 text-sm font-bold'>
							<div>
								<p>Incentive Income</p>
							</div>
						</div>
						<hr />
						<div>
							<IncentiveIncomeTable />
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default WalletPage;
