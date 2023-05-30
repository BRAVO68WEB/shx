import React, { ButtonHTMLAttributes, InputHTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariance = cva(
	'block my-2 bg-transparent w-full rounded-md border-0 py-1.5 text-primary shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6',
	{
		variants: {
			variant: {
				default: '',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
);

interface InputProps
	extends InputHTMLAttributes<HTMLInputElement>,
		VariantProps<typeof inputVariance> {
	label?: string;
	withLabel?: boolean;
}

const Input = ({
	className,
	variant,
	children,
	label,
	withLabel = true,
	...props
}: InputProps) => {
	return (
		<div>
			{withLabel && (
				<label htmlFor="email" className="block text-sm font-medium leading-6">
					{label}
				</label>
			)}
			<input
				className={cn(inputVariance({ variant, className }))}
				{...props}
			/>
		</div>
	);
};

export default Input;
