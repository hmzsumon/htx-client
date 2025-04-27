'use client';
import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetMyMembersQuery } from '@/redux/features/auth/authApi';
import { formatBalance, formatDate } from '@/lib/functions';
import Image from 'next/image';
import ImgNodata from '@/public/images/no-data.gif';
import { CircularProgress } from '@mui/material';
import { Card } from '@/components/ui/card';

function CustomNoRowsOverlay() {
	return (
		<div className='w-full h-full items-center justify-center flex'>
			<div>
				<Image src={ImgNodata} alt='No data' width={150} height={150} />
				<p className='text-sm text-gray-500 text-center'>No data available</p>
			</div>
		</div>
	);
}

function CustomLoadingOverlay() {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100%',
			}}
		>
			<CircularProgress />
			<p style={{ marginTop: 10, fontSize: '0.875rem', color: '#666' }}>
				Loading Members...
			</p>
		</Box>
	);
}

export default function RegisterUsers() {
	const { data, isLoading, isError } = useGetMyMembersQuery(undefined);
	const fetchedUsers = data?.totalUsers || [];
	const { team_a, team_b, team_c } = data || {};

	const searchParams = useSearchParams();
	const team = searchParams.get('team');

	const [searchQuery, setSearchQuery] = React.useState('');

	// Dynamic Title
	const teamTitle = React.useMemo(() => {
		if (!team) return 'All Users';
		if (team === 'team_a') return 'Team "A" Users';
		if (team === 'team_b') return 'Team "B" Users';
		if (team === 'team_c') return 'Team "C" Users';
		if (team === 'register') return 'Register Users';
		return 'All Users';
	}, [team]);

	// Filter users based on team
	const filteredUsers = React.useMemo(() => {
		if (!team) return fetchedUsers;
		if (team === 'team_a') return team_a || [];
		if (team === 'team_b') return team_b || [];
		if (team === 'team_c') return team_c || [];
		return fetchedUsers;
	}, [team, fetchedUsers, team_a, team_b, team_c]);

	const rows = filteredUsers.map((user: any) => ({
		id: user._id,
		name: user.name,
		customer_id: user.customer_id,
		date: formatDate(user.createdAt),
		status: user.status,
		totalDeposit: user.totalDeposit,
		rank: user.rank,
		package: user.package,
	}));

	// Search filtering
	const filteredRows = React.useMemo(() => {
		if (!searchQuery) return rows;

		return rows.filter((row: any) => {
			const nameMatch = row.name
				?.toLowerCase()
				.includes(searchQuery.toLowerCase());
			const uidMatch = row.customer_id
				?.toLowerCase()
				.includes(searchQuery.toLowerCase());
			return nameMatch || uidMatch;
		});
	}, [searchQuery, rows]);

	// CSV Export
	const downloadCSV = () => {
		const csvRows = [];
		const headers = [
			'Name',
			'Customer ID',
			'Status',
			'Deposit',
			'Rank',
			'Package',
			'Date',
		];
		csvRows.push(headers.join(','));

		for (const row of rows) {
			const values = [
				row.name,
				row.customer_id,
				row.status,
				formatBalance(row.totalDeposit) + ' $',
				row.rank,
				row.package,
				row.date,
			];
			csvRows.push(values.join(','));
		}

		const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${teamTitle.replace(/ /g, '_')}_members.csv`;
		a.click();
		window.URL.revokeObjectURL(url);
	};

	const columns: GridColDef<(typeof rows)[number]>[] = [
		{
			field: 'date',
			headerName: 'Date',
			width: 85,
		},
		{
			field: 'name',
			headerName: 'Name',
			width: filteredUsers.length > 0 ? 200 : 80,
		},
		{
			field: 'customer_id',
			headerName: 'UID',
			width: 80,
		},
		{
			field: 'status',
			headerName: 'Status',
			width: 80,
			renderCell: (params: any) => (
				<p>
					{params.row.status === 'Active' ? (
						<span className='text-green-500'>Active</span>
					) : (
						<span className='text-orange-500'>Inactive</span>
					)}
				</p>
			),
		},
		{
			field: 'rank',
			headerName: 'Rank',
			width: 80,
		},
		{
			field: 'package',
			headerName: 'Package',
			width: 80,
		},
		{
			field: 'totalDeposit',
			headerName: 'Deposit',
			width: 80,
			renderCell: (params: any) => (
				<div className='text-right'>
					<p>{formatBalance(params.row.totalDeposit)} $</p>
				</div>
			),
		},
	];

	return (
		<div className='w-full  px-1'>
			<Card className='my-2 p-2 h-[80vh] rounded'>
				<div className='flex items-center justify-between py-2 gap-3'>
					<h2 className='text-sm font-bold'>{teamTitle}</h2>

					<div className='flex items-center gap-3'>
						<input
							type='text'
							placeholder='Search Name or UID...'
							className='border border-gray-300 rounded-md placeholder:text-sm px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<button
							className='bg-green-500 hidden md:block hover:bg-green-600 text-white py-1 px-3 rounded text-sm'
							onClick={downloadCSV}
						>
							Export CSV
						</button>
					</div>
				</div>

				<DataGrid
					rows={filteredRows} // ✅ Searchable rows
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 10,
							},
						},
					}}
					pageSizeOptions={[10, 20, 50]}
					disableRowSelectionOnClick
					loading={isLoading}
					slots={{
						noRowsOverlay: CustomNoRowsOverlay,
						loadingOverlay: CustomLoadingOverlay,
					}}
					sx={{
						'& .MuiDataGrid-cell': {
							fontSize: '0.75rem',
							color: '#333',
						},
						'& .MuiDataGrid-columnHeaders': {
							fontSize: '0.875rem',
							fontWeight: '600',
							backgroundColor: '#f8f8f8',
						},
					}}
				/>
			</Card>
		</div>
	);
}
