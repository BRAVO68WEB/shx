import React, { ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textAreaVariance = cva(
	'block my-2 bg-transparent w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6',
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

interface TextAreaProps
	extends TextareaHTMLAttributes<HTMLTextAreaElement>,
		VariantProps<typeof textAreaVariance> {
	label?: string;
	withLabel?: boolean;
}

const TextArea = ({
	className,
	variant,
	children,
	label,
	withLabel = false,
	...props
}: TextAreaProps) => {
	return (
		<div style={{width:'inherit'}}>
			{withLabel && (
				<label htmlFor="email" className="block text-sm font-medium leading-6">
					{label}
				</label>
			)}
			<textarea className={cn(textAreaVariance({ variant, className }))} {...props} />
		</div>
	);
};

export default TextArea;
