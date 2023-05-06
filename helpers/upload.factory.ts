import multer from 'multer';
import path from 'path';
import { nanoid } from 'napi-nanoid';
interface UploaderConfig {
	mimeFilters: string[];
}
export class UploadFactory {
	public getUploader(config?: UploaderConfig) {
		const storage = multer.memoryStorage({
			filename: (req, file, cb) => {
				const fileName =
					file.originalname + '-' + nanoid() + path.extname(file.originalname);
				cb(null, fileName);
			},
		});

		return multer({
			storage: storage,
			fileFilter: (req, file, cb) => {
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
						cb(new Error('File type not allowed'), false);
					}
				} else {
					cb(null, true);
				}
			},
		});
	}
}
