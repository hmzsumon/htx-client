import React from 'react';
import { AiOutlineNotification } from 'react-icons/ai';
import Marquee from 'react-fast-marquee';
const Notice = () => {
	return (
		<>
			{/* Notice */}
			<div className='flex items-center gap-1 mt-1 md:mx-5'>
				<div>
					<AiOutlineNotification className='text-2xl text-htx-blue' />
				</div>
				<div className='flex-1'>
					<Marquee
						speed={50}
						gradientWidth={0}
						gradientColor='white'
						className='text-xs text-gray-700'
					>
						<p className='text-xs font-semibold '>
							🚀 Welcome to Glomax, your ultimate gaming and trading
							destination! 🎮💹 We are thrilled to introduce you to a
							revolutionary experience, as we proudly stand as the first-ever
							company to offer AI-powered robotic trade services. Level up your
							gaming prowess and financial acumen with cutting-edge technology
							at your fingertips.
						</p>
					</Marquee>
				</div>
			</div>
		</>
	);
};

export default Notice;
