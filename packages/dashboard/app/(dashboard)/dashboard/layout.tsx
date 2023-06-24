import { sidebarGroups } from '@/lib/sidebar';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

interface DashboardLayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: DashboardLayoutProps) => {
	const cookieList = cookies();
	const apiKey = cookieList.has('apiKey');
	const masterKey = cookieList.has('masterKey');
	const instanceUrl = cookieList.has('instanceUrl');
	if (!apiKey || !masterKey || !instanceUrl) redirect('/');
	return (
		<div className="flex h-screen">
			<div className="sidebar w-full max-w-xs h-screen bg-black flex flex-col overflow-x-hidden overflow-y-auto">
				{sidebarGroups.map((sidebarGrp, index) => {
					return (
						<div key={index} className="menu-group p-4">
							<p className="title text-lg text-primary mb-2">
								{sidebarGrp.name}
							</p>
							{sidebarGrp.items.map((item, index) => {
								return (
									<Link
										key={index}
										href={item.href}
										className="p-2.5 block text-sm hover:bg-gray-900 w-full rounded-md"
									>
										{item.name}
									</Link>
								);
							})}
						</div>
					);
				})}
			</div>
			<main className="w-full h-full overflow-y-auto p-5">{children}</main>
		</div>
	);
};

export default Layout;
