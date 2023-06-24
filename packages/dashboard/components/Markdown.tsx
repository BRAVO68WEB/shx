'use client';

import React, { useEffect, useRef } from 'react';
import showdown from 'showdown';
import 'github-markdown-css';

const converter = new showdown.Converter();

interface MarkdownProps {
	markdown: string;
}

function Markdown({ markdown }: MarkdownProps) {
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (ref.current?.innerHTML) ref.current.innerHTML = converter.makeHtml(markdown);
	}, [markdown]);
	return (
		<div className="markdown-body w-full p-10" ref={ref}>
			Markdown
		</div>
	);
}

export default Markdown;
