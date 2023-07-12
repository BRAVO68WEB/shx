import Button from '@/components/ui/Button';
import { UploadsListComponentProps } from '@/types/list';
import { ArrowUpRight, Trash } from 'lucide-react';
import React from 'react';

const GridList: React.FC<UploadsListComponentProps> = ({ data,onDelete }) => {
	return (
		<div className="w-full grid grid-cols-3 gap-2 p-4">
			{data.map(file => (
				<div
					key={file.fileID}
					className="grid-item overflow-hidden rounded-md w-full aspect-square flex items-center justify-center bg-gray-900 relative group"
				>
					<img
						src={file.upload_url}
						alt=""
						className="w-full h-full object-contain object-center"
					/>
					<div className="flex items-center justify-between gap-5 w-full absolute bottom-0 left-0 right opacity-0 translate-y-full p-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
						<p className="w-full truncate">{file.filename}</p>
						<div className="controls flex items-center gap-5">
							<Button
								variant="transparent"
								size={'icon'}
								aria-label="Delete Image"
								title="Delete Image"
								className="rounded-full p-2  hover:bg-red-50 hover:text-red-600 text-red-300"
								onClick={() => onDelete(file.fileID,file.deleteToken)}
							>
								<Trash className="h-4 w-4 " />
							</Button>
							<a
								href={file.upload_url}
								target="_blank"
								referrerPolicy="no-referrer"
								className="rounded-full p-2 hover:bg-black"
							>
								<ArrowUpRight className="h-4 w-4 " />
							</a>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default GridList;
