'use client';

import { redirect } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { Spinner } from '@/components/common';
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';

interface Props {
    children: React.ReactNode;
}

export default function RequireAuth({ children }: Props) {
    const { isLoading, isAuthenticated } = useAppSelector(state => state.auth);
    const { data: user } = useRetrieveUserQuery();

    if (isLoading) {
        console.log("Started loading")
        return (
            <div className='flex justify-center my-8'>
                <Spinner sm />
            </div>
        );
    }
    console.log("Finished loading")

    if (!isAuthenticated && !user) {
        redirect('/user/login');
    }
    console.log("End")

    return <>{children}</>;
}
