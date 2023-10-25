import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';

const { data: user, isLoading, isFetching } = useRetrieveUserQuery();
