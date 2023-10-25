'use client';

import { Form } from '@/components/forms';
import useCreateRoom from '@/hooks/useCreateRoom';

export default function CreateRoomForm() {
    const {
        room_name,
        room_description,
        room_topic,
        topics,
        isLoading,
        onChange,
        onSubmit,
    } = useCreateRoom();

    const config = [
        {
            labelText: 'Room title',
            labelId: 'room_name',
            type: 'text',
            value: room_name,
            required: true,
            inputType: 'input'
        },
        {
            labelText: 'Description',
            labelId: 'room_description',
            type: 'text',
            value: room_description,
            required: true,
            inputType: 'input'
        },
        {
            labelText: 'Topic',
            labelId: 'room_topic',
            type: 'text',
            value: room_topic,
            required: true,
            dataList: topics,
            dataListId: 'topic-list',
            inputType: 'select',
        },
    ];

    return (
        <Form
            config={config}
            isLoading={isLoading}
            btnText='Create Room'
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
}
