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

const items = [
	{
		id: 1,
		purpose: 'Personal trade',
		daily_amount: '$100',
		total_amount: '$250.00',
	},
	{
		id: 2,
		purpose: 'Signal trade',
		daily_amount: '$100',
		total_amount: '$250.00',
	},
	{
		id: 3,
		purpose: 'Live trade',
		daily_amount: '$100',
		total_amount: '$250.00',
	},
	{
		id: 4,
		purpose: 'Team',
		daily_amount: '$100',
		total_amount: '$250.00',
	},
];

export function IncomeTable() {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className=' text-gray-800 font-bold'>Purpose</TableHead>
					<TableHead className=' text-gray-800 font-bold text-center'>
						Daily Income
					</TableHead>
					<TableHead className=' text-gray-800 font-bold text-right'>
						Total Income
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{items.map((item) => (
					<TableRow key={item.id}>
						<TableCell className='font-medium'>{item.purpose}</TableCell>
						<TableCell className='text-center'>{item.daily_amount}</TableCell>
						<TableCell className=' text-right'>{item.total_amount}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
