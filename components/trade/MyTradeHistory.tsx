import Image from 'next/image';
import React from 'react';

const MyTradeHistory = () => {
	return (
		<div>
			<h2>
				<div>
					<Image
						src='/images/no-data.gif'
						width={200}
						height={200}
						alt='No Data'
						className='mx-auto'
					/>
					<p className='text-center text-gray-500 font-semibold'>
						No Records found
					</p>
				</div>
			</h2>
		</div>
	);
};

export default MyTradeHistory;
