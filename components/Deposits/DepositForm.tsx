'use client';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { RingLoader } from 'react-spinners';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useCreateDepositRequestMutation } from '@/redux/features/deposit/depositApi';
import { useSocket } from '@/context/SocketContext';
import CopyToClipboard from '@/lib/CopyToClipboard';
import UsdtIcon from '@/public/images/icons/usdt_icon.png';

const DepositForm = () => {
	const router = useRouter();
	const { socket } = useSocket();
	const [createDepositRequest, { isLoading }] =
		useCreateDepositRequestMutation();
	const [deposit, setDeposit] = useState<any>(null);

	const handleSubmit = async () => {
		try {
			const response = await createDepositRequest({
				network: 'bep20',
				chain: 'usdt',
			}).unwrap();

			if (response?.deposit) {
				setDeposit(response.deposit);
			} else {
				toast.error('Failed to create deposit');
			}
		} catch (err) {
			const errorMessage =
				(err as { data?: { message?: string } })?.data?.message ||
				'An unexpected error occurred';
			toast.error(errorMessage);
		}
	};

	useEffect(() => {
		handleSubmit(); // ✅ create deposit only once
	}, []);

	useEffect(() => {
		if (!socket) return;

		socket.on('deposit-update', (data) => {
			console.log('📦 Deposit update via socket:', data);
			toast.success(data.message || 'Deposit received!');
			setDeposit(data.deposit);

			// ✅ optional redirect or balance refresh
			router.push('/dashboard');
		});

		return () => {
			socket.off('deposit-update');
		};
	}, [socket]);

	return (
		<div className='mx-auto bg-gray-200 shadow-md rounded md:w-1/2'>
			<div className='flex items-center justify-between bg-white p-4 rounded'>
				<p className='font-bold'>Network</p>
				<p>BNB Smart Chain (BEP20)</p>
			</div>

			{isLoading && (
				<div className='flex items-center justify-center h-[50vh] p-4 bg-white'>
					<RingLoader color='#36d7b7' loading size={100} />
				</div>
			)}

			{deposit && (
				<div className='mt-4 p-4 bg-white rounded'>
					<div className='flex items-center justify-between mb-2'>
						<p>Supported Currency</p>
						<div className='flex items-center gap-2'>
							<Image
								src={UsdtIcon}
								alt='USDT'
								width={24}
								height={24}
								className='object-contain'
							/>
							<p className='font-bold'>USDT</p>
						</div>
					</div>

					<hr />

					<div>
						<p className='mt-2'>Deposit Address</p>
						<div className='flex flex-col items-center justify-center mt-2 gap-2'>
							{/* ✅ QR Code from base64 */}
							<img
								src={`data:image/png;base64,${deposit.qrCode}`}
								alt='QR Code'
								className='mx-auto w-48 h-48 border rounded'
							/>
							<span className='text-center text-xs text-gray-400'>
								This address only accepts <b>USDT</b>
							</span>
						</div>

						{/* ✅ Copyable address */}
						<div className='mt-2 flex items-center justify-between bg-slate-200 p-2 rounded'>
							<p className='text-xs font-bold break-all'>
								{deposit.destinationAddress}
							</p>
							<CopyToClipboard text={deposit.destinationAddress} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DepositForm;
