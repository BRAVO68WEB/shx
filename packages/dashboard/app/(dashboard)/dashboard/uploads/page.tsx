import api from '@/api';
import UploadsList from '@/components/Lists/UploadsList';
import React from 'react';

const Uploads = async () => {
	const uploads = await api.uploads.getAllUploads();
	return <UploadsList data={uploads}/>;
};

export default Uploads;
