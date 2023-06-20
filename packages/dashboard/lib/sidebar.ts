export const sidebarGroups: SidebarGroup[] = [
	{
		name: 'Group1',
		items: [
			{
				name: 'Dashboard',
				href: '/dashboard',
			},
			{
				name: 'Uploads',
				href: '/dashboard/uploads',
			},
			{
				name: 'Notes',
				href: '/dashboard/notes',
			},
			{
				name: 'Api Keys',
				href: '/dashboard/apiKeys',
			},
			{
				name: 'Url Shortener',
				href: '/dashboard/url',
			},
		],
	},
	{
		name: 'Utilities',
		items: [
			{
				name: 'Instance Info',
				href: '/dashboard/utilities/instance-info',
			},
			{
				name: 'Uploads',
				href: '/dashboard/utilities/settings',
			},
			{
				name: 'Notes',
				href: '/dashboard/utilites/download-config',
			},
		],
	},
];
