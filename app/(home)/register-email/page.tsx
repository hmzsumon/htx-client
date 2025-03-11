import InputForm from '@/components/register/EmailInputFrom';
import { Card } from '@/components/ui/card';

export default function RegisterEmail() {
	return (
		<div className='w-11/12 md:w-7/12 mx-auto mt-10'>
			<Card className='p-4'>
				<div className='my-5'>
					<h1 className='text-2xl font-bold'>Welcome to HTX Trade</h1>
				</div>
				<InputForm />
			</Card>
		</div>
	);
}
