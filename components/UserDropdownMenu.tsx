'use client';
import {
	Cloud,
	CreditCard,
	Github,
	Keyboard,
	LifeBuoy,
	LogOut,
	Mail,
	Menu,
	MessageSquare,
	Plus,
	PlusCircle,
	Settings,
	User,
	UserPlus,
	Users,
} from 'lucide-react';

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
				<Menu className='text-htx-blue cursor-pointer' />
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
						<DropdownMenuShortcut>{user?.m_balance} $</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleLogout}>
					<LogOut />
					<span>Log out</span>
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
