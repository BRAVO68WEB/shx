interface SidebarItem {
	name: string;
	href: string;
	icon?: string;
}

interface SidebarGroup {
	name: string;
	items: SidebarItem[];
}
