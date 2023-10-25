import { useState, ChangeEvent, FormEvent } from 'react';
import { useCreateRoomMutation } from '@/redux/features/roomApiSlice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import { useCreateTopicMutation, useGetTopicsQuery } from '@/redux/features/topicApiSlice';

export default function useCreateRoom() {
    const router = useRouter();
    const { data: user } = useRetrieveUserQuery()
    const { data: topicList, refetch: refetchTopics} = useGetTopicsQuery()
    const topics = topicList?.results



	const [createRoom, { isLoading }] = useCreateRoomMutation();
	const [createTopic, {isSuccess}] = useCreateTopicMutation();

	const [formData, setFormData] = useState({
        room_name: '',
        room_description: '',
        room_topic: '',
	});

    const { room_name, room_description, room_topic } = formData;


	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(room_topic)
		refetchTopics()
		if (!topics.some(key => key.name === room_topic)) {
			createTopic({ name: room_topic })
			.unwrap()
			.catch(() => {
				toast.error('Failed to create topic');
			});
		}

		createRoom({ host: user?.id, name: room_name, description: room_description, topic: room_topic })
			.unwrap()
			.then(() => {
				toast.success('Success!');
				router.push('/user/profile/');
			})
			.catch(() => {
				toast.error('Failed to create room');
			});
	};

	return {
		room_name,
		room_description,
        room_topic,
        topics,
        isLoading,
        onChange,
		onSubmit,
	};
}
