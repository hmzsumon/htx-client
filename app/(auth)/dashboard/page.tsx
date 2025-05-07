'use client';
import ContactMenu from '@/components/dashboard/ContactMenu';
import { DashboardDialog } from '@/components/dashboard/Dialog';
import GlobalTradeViewMenu from '@/components/dashboard/GlobalTradeViewMenu';
import GlobalTradeViewMenu2 from '@/components/dashboard/GlobalTradeViewMenu2';
import SettingsMenu from '@/components/dashboard/SettingsMenu';

import TradeMenu from '@/components/dashboard/TradeMenu';
import AnnouncementBanner from '@/components/home/AnnouncementBanner';
import SimpleSlider from '@/components/home/Carousel';
import Notice from '@/components/home/Notice';
import React from 'react';

const Dashboard = () => {
	return (
		<div className='space-y-4 pb-24'>
			<div>
				<SimpleSlider />
				<AnnouncementBanner />
			</div>
			<div className='space-y-4'>
				<TradeMenu />
				<SettingsMenu />
				<GlobalTradeViewMenu />
				<GlobalTradeViewMenu2 />
				<ContactMenu />
			</div>
			<DashboardDialog />
		</div>
	);
};

export default Dashboard;
