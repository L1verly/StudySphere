import { ChangeEvent, FormEvent } from 'react';
import { Input } from '@/components/forms';
import { Spinner } from '@/components/common';
import Select from './Select';


interface Config {
	labelText: string;
	labelId: string;
	type: string;
	value: string;
	link?: {
		linkText: string;
		linkUrl: string;
	};
	required?: boolean;
	inputType?: string;
	dataList?: string[];
	dataListId?: string;
}

interface Props {
	config: Config[];
	isLoading: boolean;
	btnText: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function Form({
	config,
	isLoading,
	btnText,
	onChange,
	onSubmit,
}: Props) {
	return (
		<form className='form' onSubmit={onSubmit}>
			{config.map( (input) => (
				input.inputType === 'select' ?
				<Select
					key={input.labelId}
					labelId={input.labelId}
					type={input.type}
					onChange={onChange}
					link={input.link}
					required={input.required}
					dataList={input.dataList}
					dataListId={input.dataListId}
				>
					{input.labelText}
				</Select>
				: 
				<Input
					key={input.labelId}
					labelId={input.labelId}
					type={input.type}
					onChange={onChange}
					value={input.value}
					link={input.link}
					required={input.required}
				>
					{input.labelText}
				</Input>
				))}

			<div>
				<button
					type='submit'
					className='btn btn--main'
					disabled={isLoading}
				>
					<svg
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						viewBox="0 0 32 32"
					>
					<title>lock</title>
					<path d="M27 12h-1v-2c0-5.514-4.486-10-10-10s-10 4.486-10 10v2h-1c-0.553 0-1 0.447-1 1v18c0 0.553 0.447 1 1 1h22c0.553 0 1-0.447 1-1v-18c0-0.553-0.447-1-1-1zM8 10c0-4.411 3.589-8 8-8s8 3.589 8 8v2h-16v-2zM26 30h-20v-16h20v16z"></path>
					<path d="M15 21.694v4.306h2v-4.306c0.587-0.348 1-0.961 1-1.694 0-1.105-0.895-2-2-2s-2 0.895-2 2c0 0.732 0.413 1.345 1 1.694z"></path>
					</svg>
					{isLoading ? <Spinner /> : `${btnText}`}
				</button>
			</div>
		</form>
	);
}
