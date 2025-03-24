'use client';
import React from 'react';
import Cookies from 'js-cookie';
import { formatBalance } from '@/lib/functions';
import { useSelector } from 'react-redux';
import { Card } from '@/components/ui/card';
import Wallet from '@/public/images/icons/wallet_2.png';
import Deposit from '@/public/images/icons/deposit.png';
import Withdraw from '@/public/images/icons/withdraw.png';
import Transfer from '@/public/images/icons/money-transfer.png';
import MenuCard from '@/components/profile/MenuCard';
import HistoryMenu from '@/components/profile/HistoryMenu';
import MenuCard2 from '@/components/profile/MenuCard2';
import OurServiceCard from '@/components/profile/OurServiceCard';
import { Button } from '@/components/ui/button';
import { CirclePower } from 'lucide-react';
import { useLogoutUserMutation } from '@/redux/features/auth/authApi';
import { useRouter } from 'next/navigation';
import UserInfo from '@/components/UserInfo';

const items = [
	{
		id: 1,
		title: 'Wallet',
		icon: null,
		iconImg: Wallet,
		link: '/wallet',
	},
	{
		id: 2,
		title: 'Deposit',
		icon: null,
		iconImg: Deposit,
		link: '/deposit',
	},
	{
		id: 3,
		title: 'Withdraw',
		icon: null,
		iconImg: Withdraw,
		link: '/withdraw',
	},
	{
		id: 4,
		title: 'Transfer',
		icon: null,
		iconImg: Transfer,
		link: '/transfer',
	},
];

const ProfilePage = () => {
	const router = useRouter();
	const { user } = useSelector((state: any) => state.auth);
	const [logout, { data, isLoading, isSuccess, isError, error }] =
		useLogoutUserMutation();

	// handle logout
	const handleLogout = async () => {
		logout(undefined);
		router.push('/');
		Cookies.remove('htx-token');
	};

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
					<Card className='p-4 bg-gray-50'>
						<div className=' flex items-center justify-between my-2 text-sm font-bold'>
							<div>
								<p>Total Balance</p>
								<p>${formatBalance(user?.m_balance)}</p>
							</div>
							<div>
								<p>Demo Balance</p>
								<p>${formatBalance(user?.m_balance)}</p>
							</div>
						</div>
						<hr />
						<div>
							<MenuCard
								bgColor='bg-blue-50'
								title='Quick Links'
								items={items}
							/>
						</div>
					</Card>
				</div>
				{/* End Card Section */}
			</div>

			<div className='mt-24 space-y-4'>
				<HistoryMenu />
				<MenuCard2 />
				<OurServiceCard />
			</div>

			<div className='my-6 px-2'>
				<Button
					onClick={handleLogout}
					className='flex items-center gap-2 w-full bg-red-500 hover:bg-red-600 rounded-3xl font-bold'
				>
					<CirclePower />
					<span>Log Out</span>
				</Button>
			</div>
		</div>
	);
};

export default ProfilePage;
