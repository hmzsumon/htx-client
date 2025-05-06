import { apiSlice } from '../api/apiSlice';

export const announcementApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get active announcements
		getActiveAnnouncements: builder.query<any, void>({
			query: () => ({
				url: '/active-announcement',
				method: 'GET',
			}),
		}),
	}),
});

export const { useGetActiveAnnouncementsQuery } = announcementApi;
