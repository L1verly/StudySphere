import { apiSlice } from '../services/apiSlice';


interface Topic {
	id: number,
    name: string
}

interface TopicList {
	results: [
        Topic
    ]
}


const topicApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTopic: builder.query<Topic, void>({
            query: (id) => `/topics/${id}/`,
        }),
        getTopics: builder.query<TopicList, void>({
            query: () => `/topics/`,
        }),
        createTopic: builder.mutation({
			query: ({
                name,
			}) => ({
				url: `/topics/`,
				method: 'POST',
				body: { name },
			}),
		}),
    }),
})

export const {
    useGetTopicQuery,
    useGetTopicsQuery,
    useCreateTopicMutation,
} = topicApiSlice;