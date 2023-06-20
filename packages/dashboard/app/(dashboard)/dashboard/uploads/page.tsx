import api from '@/api';
import UploadsList from '@/components/Lists/UploadsList';
import React from 'react';

const Uploads = async () => {
	const data = await api.uploads.getAllUploads()
	console.log(data);
	return <UploadsList />;
};

export default Uploads;
