import { Button } from '@/components/ui/button';
import HomeLayout from './(home)/layout';
import HeroSection from '@/components/home/HeroSection';
import SimpleSlider from '@/components/home/Carousel';
import Notice from '@/components/home/Notice';
import CryptoSection from '@/components/home/CryptoSection';
import TradeVolume from '@/components/home/TradeVolume';
import OurProduct from '@/components/home/Overview';
import Overview from '@/components/home/Overview';
import SageAndTrust from '@/components/home/SageAndTrust';

export default function Home() {
	return (
		<HomeLayout>
			<div>
				<HeroSection />
				<CryptoSection />
				<TradeVolume />
				<Overview />
				<SageAndTrust />
			</div>
		</HomeLayout>
	);
}
