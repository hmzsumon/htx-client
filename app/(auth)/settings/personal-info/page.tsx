import AddressInfoCard from '@/components/settings/AddressInfoCard';
import ContactInfoCard from '@/components/settings/ContactInfoCard';
import PersonalInfo from '@/components/settings/PersonalInfo';
import UserInfo2 from '@/components/settings/UserInfo2';
import { Card } from '@/components/ui/card';
import React from 'react';

const PersonalInfoSettings = () => {
	return (
		<div className='relative pb-20'>
			<div className='promotion-wrapper h-[300px] px-4  rounded-b-3xl'>
				<div className=' p-4'>
					<UserInfo2 />
				</div>
				<div className=' top-20 '>
					<ContactInfoCard />
				</div>
			</div>
			<div className='mt-14  space-y-4 px-4'>
				<AddressInfoCard />
			</div>
		</div>
	);
};

export default PersonalInfoSettings;
