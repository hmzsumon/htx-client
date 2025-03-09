import { Button } from '@/components/ui/button';
import HomeLayout from './(home)/layout';
import HeroSection from '@/components/home/HeroSection';
import SimpleSlider from '@/components/home/Carousel';
import Notice from '@/components/home/Notice';
import CryptoSection from '@/components/home/CryptoSection';
import TradeVolume from '@/components/home/TradeVolume';

export default function Home() {
	return (
		<HomeLayout>
			<div>
				<HeroSection />
				<CryptoSection />
				<TradeVolume />
			</div>
		</HomeLayout>
	);
}
