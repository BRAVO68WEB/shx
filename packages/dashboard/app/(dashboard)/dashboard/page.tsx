import Markdown from '@/components/Markdown';
import axios from 'axios';
import React from 'react';
import showdown from 'showdown';
const converter = new showdown.Converter();

const Dashboard = async () => {
	const { data } = await axios.get(
		'https://raw.githubusercontent.com/BRAVO68WEB/shx/dev/README.md'
	);
	return (
		<>
			<Markdown markdown={converter.makeHtml(data)} />
		</>
	);
};

export default Dashboard;
