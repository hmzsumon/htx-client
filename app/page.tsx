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
import TradeAnytime from '@/components/home/TradeAnytime';
import SocialMedia from '@/components/home/SocialMedia';
import StartWithHTX from '@/components/home/StartWithHTX';
import PowerUpSection from '@/components/home/PowerUpSection';
import DepositAndTrade from '@/components/home/DepositAndTrade';

export default function Home() {
	return (
		<HomeLayout>
			<div>
				<HeroSection />
				<CryptoSection />
				<TradeVolume />
				<StartWithHTX />
				<Overview />
				<PowerUpSection />
				<SageAndTrust />
				<DepositAndTrade />
				<TradeAnytime />
				<SocialMedia />
			</div>
		</HomeLayout>
	);
}
