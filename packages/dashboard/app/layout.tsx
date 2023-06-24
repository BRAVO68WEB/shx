import React from 'react';
import './globals.css';
import { Source_Code_Pro } from 'next/font/google';
import Providers from '@/components/Providers';

const inter = Source_Code_Pro({ subsets: ['latin'] });

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${inter.className} bg-black text-white min-h-screen`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
