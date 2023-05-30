import React, { ButtonHTMLAttributes, InputHTMLAttributes } from "react";
import {cva,VariantProps} from "class-variance-authority"
import { cn } from "@/lib/utils";

const buttonVariance = cva(
	'flex w-full justify-center rounded-md mt-4 font-semibold leading-6 text-white shadow-sm active:scale-105 transition',
	{
		variants: {
			variant: {
				default: 'bg-primary',
				transparent:'bg-transparent'
			},
			size: {
				default: 'px-3 py-1.5 text-sm',
				icon:'w-auto h-auto p-3 m-0'
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

interface ButtonProsp extends ButtonHTMLAttributes<HTMLButtonElement>,VariantProps<typeof buttonVariance>  {}

const Button = ({className,size,variant,children,...props}:ButtonProsp) => {
    return <button className={cn(buttonVariance({variant,size,className}))} {...props} >
		{children}
	</button>
}

export default Button