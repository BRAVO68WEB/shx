import api from '@/api'
import './globals.css'
import { Source_Code_Pro } from 'next/font/google'

const inter = Source_Code_Pro({subsets:['latin']})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  api.setInstanceUrl("http://localhost:4000")
  api.setApiKey('SHX-uyblf-ixuiz');
  
  return (
		<html lang="en">
			<body className={`${inter.className} bg-black text-white min-h-screen`}>{children}</body>
		</html>
	);
}
