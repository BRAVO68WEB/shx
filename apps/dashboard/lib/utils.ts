import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const parseDate = (date: string) => {
	return new Date(date).toISOString().split('T')[0];
};
