import { sidebarGroups } from '@/lib/sidebar';
import Link from 'next/link';
import React from 'react';

interface DashboardLayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: DashboardLayoutProps) => {
	return (
		<div className="flex min-h-screen">
			<div className="sidebar w-full max-w-xs h-screen bg-black flex flex-col overflow-x-hidden overflow-y-auto">
				{sidebarGroups.map((sidebarGrp, index) => {
					return (
						<div key={index} className="menu-group p-4">
							<p className="title text-lg text-primary mb-2">{sidebarGrp.name}</p>
							{sidebarGrp.items.map((item, index) => {
								return (
									<Link
                                        key={index}
										href={item.href}
										className="p-2.5 block text-sm hover:bg-gray-900 w-full rounded-md"
									>
										item.name
									</Link>
								);
							})}
						</div>
					);
				})}
			</div>
			<main>{children}</main>
		</div>
	);
};

export default Layout;
