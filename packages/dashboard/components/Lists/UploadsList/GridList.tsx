import React from 'react'

export default function GridList() {
  return (
		<div className="w-full grid grid-cols-3 gap-2 p-4">
			<div className="grid-item rounded-md w-full aspect-square flex items-center justify-center bg-gray-900"></div>
			<div className="grid-item rounded-md w-full aspect-square flex items-center justify-center bg-gray-900"></div>
			<div className="grid-item rounded-md w-full aspect-square flex items-center justify-center bg-gray-900"></div>
			<div className="grid-item rounded-md w-full aspect-square flex items-center justify-center bg-gray-900"></div>
		</div>
	);
}
