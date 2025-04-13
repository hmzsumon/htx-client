import React from 'react';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { formatBalance } from '@/lib/functions';
import { useSelector } from 'react-redux';

interface RoundHistoryProps {
	records: {
		buyPrice: number;
		sellPrice: number;
		result: string;
		issueId: string;
		symbol: string;
	}[];
}

const RoundHistory = ({ records }: RoundHistoryProps) => {
	// console.log('RoundHistory records:', records);
	const { symbol } = useSelector((state: any) => state.trade);

	// filter records by symbol
	const filteredRecords = records?.filter((record) => record.symbol === symbol);
	return (
		<Table className='text-xs '>
			<TableBody>
				{filteredRecords?.map((record, index) => (
					<TableRow
						key={index}
						className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
					>
						<TableCell className='text-left flex flex-col gap-1 py-4'>
							<span>{record.issueId}</span>
							<span className='flex items-center gap-1'>
								<span>Buy</span>
								<span className='text-green-500'>
									{formatBalance(record.buyPrice)}
								</span>
							</span>
						</TableCell>
						<TableCell className='text-center '>
							Sell{' '}
							<span className='text-red-500'>
								{formatBalance(record.sellPrice)}
							</span>
						</TableCell>
						<TableCell className=' items-end '>
							<div>
								{' '}
								Result{' '}
								<span
									className={` ${
										record.result === 'Up' ? 'text-green-500' : 'text-red-500'
									} `}
								>
									{record.result}
								</span>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default RoundHistory;
