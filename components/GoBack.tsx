'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';

const GoBack = ({ color = 'text-gray-800' }) => {
	const router = useRouter();
	return (
		<button type='button' onClick={() => router.back()}>
			<MdKeyboardDoubleArrowLeft className={`text-3xl ${color}`} />
		</button>
	);
};

export default GoBack;
