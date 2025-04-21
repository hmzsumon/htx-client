import ResetPassword2 from '@/components/settings/ResetPassword';
import UserInfo2 from '@/components/settings/UserInfo2';
import React from 'react';

const RestPassword = () => {
	return (
		<div className='relative pb-[500px]'>
			<div className='promotion-wrapper h-[300px] px-4 rounded-b-3xl'>
				<div className=' p-4'>
					<div className=' p-4'>
						<UserInfo2 />
					</div>
				</div>
				<div className='  '>
					<ResetPassword2 />
				</div>
			</div>
			{/* <div className='mt-52 md:mt-16 space-y-4 px-4'></div> */}
		</div>
	);
};

export default RestPassword;
