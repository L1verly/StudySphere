import { ChangeEvent } from 'react';
import Link from 'next/link';

interface Props {
    labelId: string;
    type: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    children: React.ReactNode;
    link?: {
        linkText: string;
        linkUrl: string;
    };
    required?: boolean;
    dataList: Array<string>;
    dataListId: string;
}

export default function Select({
    labelId,
    type,
    value,
    onChange,
    children,
    link,
    required = false,
    dataList,
    dataListId,
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
                    name={labelId}
                    type={type}
                    onChange={onChange}
                    value={value}
                    list={dataListId}
                    required={required}
                />
                <datalist id={dataListId}>
                    {/* <select id={labelId}> */}
                        {dataList?.map((data) => (
                            <option key={data?.id} value={data?.name} />
                        ))}
                    {/* </select> */}
                </datalist>
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
