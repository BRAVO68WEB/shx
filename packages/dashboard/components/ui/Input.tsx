import React, {
	forwardRef,
	InputHTMLAttributes,
	LegacyRef,
	MutableRefObject,
} from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { RefCallBack } from 'react-hook-form';

const inputVariance = cva(
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

interface InputProps
	extends InputHTMLAttributes<HTMLInputElement>,
		VariantProps<typeof inputVariance> {
	label?: string;
	withLabel?: boolean;
	ref?: MutableRefObject<HTMLInputElement> | RefCallBack;
}

const Input = forwardRef<HTMLInputElement | InputProps>(
	(
		{ className, variant, label, withLabel = false, ...props }: InputProps,
		ref
	) => {
		return (
			<div style={{ width: 'inherit' }}>
				{withLabel && (
					<label
						htmlFor="email"
						className="block text-sm font-medium leading-6"
					>
						{label}
					</label>
				)}
				<input
					ref={ref as LegacyRef<HTMLInputElement>}
					className={cn(inputVariance({ variant, className }))}
					{...props}
				/>
			</div>
		);
	}
) as React.FC<InputProps>;
Input.displayName = 'Input';

export default Input;
