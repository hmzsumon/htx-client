'use client';
import { CreditCard, LogOut, Menu, User } from 'lucide-react';
import Image from 'next/image';
import ProfileImg from '@/public/images/icons/profile.png';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { useLogoutUserMutation } from '@/redux/features/auth/authApi';
import { useRouter } from 'next/navigation';
import { formatBalance } from '@/lib/functions';

export function UserDropdownMenu() {
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
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Image
					src={ProfileImg}
					alt='profile'
					className='w-6 h-6 rounded-full cursor-pointer'
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56 mr-4'>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<User />
						<span>UID</span>
						<DropdownMenuShortcut>{user?.customer_id}</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<CreditCard />
						<span>Balance</span>
						<DropdownMenuShortcut>
							{formatBalance(user?.m_balance)}$
						</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={handleLogout}
					className='cursor-pointer  hover:bg-red-500 hover:text-white'
				>
					<LogOut />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
