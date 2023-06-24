'use client';
import React from 'react';
import { Toaster } from 'react-hot-toast';

function Providers({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Toaster position={'top-right'} reverseOrder={false} />
			{children}
		</>
	);
}

export default Providers;
