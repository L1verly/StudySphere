import { apiSlice } from '../services/apiSlice';

interface Room {
	id: number,
	name: string,
	host: number,
	topic: string,
	slug: string,
	created: string,
	description: string
	participants: [
		userId: number
	]
}

interface RoomList {
	results: [
		Room
	]
}


const roomApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRoom: builder.query<Room, void>({
            query: (slug) => `/rooms/${slug}/`,
        }),
        getRooms: builder.query<RoomList, void>({
            query: () => `/rooms/`,
        }),
        createRoom: builder.mutation({
			query: ({
				host,
				name,
				description,
				topic,
			}) => ({
				url: `/rooms/`,
				method: 'POST',
				body: { host, name, description, topic },
			}),
		}),
		updateRoom: builder.mutation({
			query: ({
				slug,
				host,
				name,
				description,
				topic,
			}) => ({
				url: `/rooms/${slug}/`,
				method: 'PATCH',
				body: { host, name, description, topic },
			}),
		}),
		deleteRoom: builder.mutation({
			query: (slug) => ({
				url: `/rooms/${slug}/`,
				method: 'DELETE',
			}),
		}),
    }),
})

export const {
    useGetRoomQuery,
    useGetRoomsQuery,
    useCreateRoomMutation,
    useUpdateRoomMutation,
    useDeleteRoomMutation,
} = roomApiSlice;
