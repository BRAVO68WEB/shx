'use client';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import api from '@/api';

const tabs = [
	{
		name: 'Instance Info',
		href: '/dashboard/utilities/instance-info',
		current: false,
	},
	{ name: 'Settings', href: '/dashboard/utilities/settings', current: false },
	{
		name: 'Config Download',
		href: '/dashboard/utilities/download-config',
		current: true,
	},
];

export default function Example({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	function isCurrent(href: string) {
		return href === pathname;
	}
	return (
		<>
			<h1 className="text-4xl mb-10">My Utilities</h1>
			<div className="sm:hidden">
				<label htmlFor="tabs" className="sr-only">
					Select a tab
				</label>
				{/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
				<select
					id="tabs"
					name="tabs"
					className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
					defaultValue={tabs.find(tab => tab.current)?.name}
				>
					{tabs.map(tab => (
						<option key={tab.name}>{tab.name}</option>
					))}
				</select>
			</div>
			<div className="hidden sm:block">
				<div className="border-b border-gray-200">
					<nav className="-mb-px flex" aria-label="Tabs">
						{tabs.map(tab => (
							<Link
								key={tab.name}
								href={tab.href}
								className={cn(
									isCurrent(tab.href)
										? 'border-primary text-primary'
										: 'border-transparent text-white',
									'w-full border-b-2 py-4 px-1 text-center text-sm font-medium '
								)}
								aria-current={tab.current ? 'page' : undefined}
							>
								{tab.name}
							</Link>
						))}
					</nav>
				</div>
			</div>
			{children}
		</>
	);
}
