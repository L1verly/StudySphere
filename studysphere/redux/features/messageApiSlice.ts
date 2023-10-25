import { apiSlice } from '../services/apiSlice';

interface Message {
	id: number,
	room: number,
	user: number
	body: string,
	created: string
}

interface MessageList {
	results: [
		Message
	]
}


const messageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessage: builder.query<Message, void>({
            query: (id) => `/messages/${id}/`,
        }),
        getMessages: builder.query<MessageList, void>({
            query: () => `/messages/`,
			providesTags: ['Message'],
        }),
        createMessage: builder.mutation({
			query: ({
				user,
				room,
				body,
			}) => ({
				url: `/messages/`,
				method: 'POST',
				body: { user, room, body },
			}),
			invalidatesTags: ['Message'],
		}),
		deleteMessage: builder.mutation({
			query: (id) => ({
				url: `/messages/${id}/`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Message'],
		}),
    }),
})

export const {
    useGetMessageQuery,
    useGetMessagesQuery,
    useCreateMessageMutation,
    useDeleteMessageMutation
} = messageApiSlice;
