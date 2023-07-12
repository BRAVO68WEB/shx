import Markdown from '@/components/Markdown';
import axios from 'axios';
import React from 'react';

const Dashboard = async () => {
	const { data } = await axios.get(
		'https://raw.githubusercontent.com/BRAVO68WEB/shx/dev/README.md'
	);
	return (
		<>
			<Markdown markdown={data} />
		</>
	);
};

export default Dashboard;
