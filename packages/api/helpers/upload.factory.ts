import multer from 'multer';
import path from 'path';
import { nanoid } from 'napi-nanoid';
import { FileData } from '../types';
import { IUploadFactory, UploaderConfig } from '../interfaces/upload.interface';

export class UploadFactory implements IUploadFactory {
	public getUploader(config?: UploaderConfig): any {
		const storage = multer.memoryStorage();

		return multer({
			storage: storage,
			fileFilter: (req, file: FileData, cb) => {
				file.originalname = file.originalname.replace(/\s/g, '_');
				const fileName =
					file.originalname.split('.')[
						file.originalname.split('.').length - 2
					] +
					'-' +
					nanoid() +
					path.extname(file.originalname);
				file.newName = fileName;
				if (config?.mimeFilters?.length) {
					if (config.mimeFilters.includes(file.mimetype)) {
						cb(null, true);
					} else {
						cb(null, false);
					}
				} else {
					cb(null, true);
				}
			},
		});
	}
}
