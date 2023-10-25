'use client';

// import { useVerify } from '@/hooks';
import { ToastContainer } from 'react-toastify';
import { useVerify } from '@/hooks';
import 'react-toastify/dist/ReactToastify.css';

export default function Setup() {
    useVerify();

    return <ToastContainer />;
}
