'use client';

import Cookies from 'js-cookie';
import { useEffect } from 'react';

function ErrorPage() {
	useEffect(() => {
		console.log(Cookies.get());
	},[]);
	return <div>ErrorPage</div>;
}

export default ErrorPage;
