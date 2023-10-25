import { ChangeEvent } from 'react';
import Link from 'next/link';

interface Props {
    labelId: string;
    type: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    children: React.ReactNode;
    link?: {
        linkText: string;
        linkUrl: string;
    };
    required?: boolean;
}

export default function Input({
    labelId,
    type,
    onChange,
    value,
    children,
    link,
    required = false,
}: Props) {
    return (
        <div>
            <div className='form__group form__group'>
                <label htmlFor={labelId}>
                    {children}
                </label>
            </div>
            <div className='form__group form__group'>
                <input
                    id={labelId}
                    name={labelId}
                    type={type}
                    onChange={onChange}
                    value={value}
                    required={required}
                    />
            {link && (
                    <div className='flex flex-row-reverse text-sm'>
                    <Link
                        className='font-semibold text-indigo-600 hover:text-indigo-500'
                        href={link.linkUrl}
                    >
                        {link.linkText}
                    </Link>
                </div>
            )}
            </div>
        </div>
    );
}
