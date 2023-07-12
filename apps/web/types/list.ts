export interface UploadsListComponentProps {
	edit: boolean;
	data: IFile[];
	onDelete: (fileID: string, deleteToken: string) => void;
}
