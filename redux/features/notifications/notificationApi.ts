import { apiSlice } from '../api/apiSlice';

export const notificationApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get notifications
		getNotifications: builder.query<any, void>({
			query: () => '/notifications',
			providesTags: ['Notification'],
		}),

		// update notification isRead true
		updateNotification: builder.mutation<any, any>({
			query: (id) => ({
				url: `/admin/notification/${id}`,
				method: 'PUT',
			}),
		}),

		// delete notification
		deleteNotification: builder.mutation<any, any>({
			query: (id) => ({
				url: `/delete/user/notification/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Notification'],
		}),
	}),
});

export const {
	useGetNotificationsQuery,
	useUpdateNotificationMutation,
	useDeleteNotificationMutation,
} = notificationApi;
