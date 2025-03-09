'use client';
import Container from '@/components/layout/Container';
import { useRouter } from 'next/navigation';
import React from 'react';
import { HiArrowSmLeft } from 'react-icons/hi';

const TermsAndConditions = () => {
	const router = useRouter();
	return (
		<Container>
			<div className='px-4 py-6 text-blue-gray-200 bg-black_2'>
				<div className='flex gap-4'>
					<HiArrowSmLeft
						className='text-2xl cursor-pointer text-blue-gray-300 hover:text-blue-700'
						onClick={() => router.back()}
					/>
					<p>
						<span className='text-xl font-bold'>
							Terms & Conditions for HTX Trade
						</span>
					</p>
				</div>

				<p>
					<br /> <br />
					<span className='font-bold underline '>1. Introduction</span> <br />
					Welcome to htxtrade.org (the "Site"). By accessing or using our Site,
					you agree to comply with and be bound by these Terms & Conditions. If
					you do not agree, please do not use our services.
					<br /> <br />
					<span className='font-bold underline '>2. Use of Services</span>{' '}
					<br />
					You must be at least 18 years old to use our services. You are
					responsible for maintaining the confidentiality of your account
					information and for all activities that occur under your account.
					<br /> <br />
					<span className='font-bold underline '>
						3. Trading Activities
					</span>{' '}
					<br />
					All trading activities on our platform are subject to market risks.
					HTX Trade is not responsible for any financial losses incurred during
					trading. Ensure you understand the risks before engaging in trading
					activities.
					<br /> <br />
					<span className='font-bold underline '>4. User Conduct</span> <br />
					You agree not to misuse our services, including but not limited to
					engaging in fraudulent activities, violating applicable laws, or
					harming our platform's integrity.
					<br /> <br />
					<span className='font-bold underline '>5. Termination</span> <br />
					We reserve the right to terminate your access to our services at our
					discretion, without notice, if you violate these Terms & Conditions.
					<br /> <br />
					<span className='font-bold underline '>
						6. Limitation of Liability
					</span>
					<br />
					To the fullest extent permitted by law, HTX Trade will not be liable
					for any direct, indirect, incidental, or consequential damages arising
					from the use of our services.
					<br /> <br />
					<span className='font-bold underline '>
						7. Changes to Terms & Conditions
					</span>
					<br />
					We may modify these Terms & Conditions at any time. By continuing to
					use the Site, you agree to the updated terms.
					<br /> <br />
					<span className='font-bold underline '>8. Contact Us</span>
					<br />
					For any questions or concerns, please contact us at
					support@htxtrade.org
				</p>
			</div>
		</Container>
	);
};

export default TermsAndConditions;
