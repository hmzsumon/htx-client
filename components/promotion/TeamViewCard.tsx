import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { SquareArrowOutUpRight, Users } from 'lucide-react';
import Link from 'next/link';
import { link } from 'fs';

const items = [
	{
		id: 1,
		team: 'Register',
		inactive: 10,
		active: 0,
		link: '#',
	},
	{
		id: 2,
		team: 'Team "A"',
		inactive: 0,
		active: 250,
		link: '#',
	},
	{
		id: 3,
		team: 'Team "B"',
		inactive: 0,
		active: 250,
		link: '#',
	},
	{
		id: 4,
		team: 'Team "C"',
		inactive: 0,
		active: 250,
		link: '#',
	},
];

export function TeamViewCard() {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className=' text-gray-50 font-bold'>Team</TableHead>
					<TableHead className=' text-gray-50 font-bold text-right'>
						Inactive
					</TableHead>
					<TableHead className=' text-gray-50 font-bold text-right'>
						Active
					</TableHead>
					<TableHead className=' text-gray-50 font-bold text-right'>
						Action
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{items.map((item) => (
					<TableRow key={item.id}>
						<TableCell className='font-medium text-xs'>{item.team}</TableCell>
						<TableCell className=' text-right text-red-500  '>
							<span className='flex items-center gap-1  justify-end '>
								{item.inactive}
								<Users size={15} />
							</span>
						</TableCell>
						<TableCell className=' text-right text-green-500  '>
							<span className='flex items-center gap-1  justify-end'>
								{item.active}
								<Users size={15} />
							</span>
						</TableCell>
						<TableCell>
							<Link href={item.link} className=' flex justify-end'>
								<SquareArrowOutUpRight size={15} />
							</Link>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
