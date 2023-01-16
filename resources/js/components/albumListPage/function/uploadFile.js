import axios from 'axios'

const uploadFile = (data, params = {}) => {
	const url = '/api/file'
	const options = {
		params,
		headers: {
			ContentType: 'multipart/form-data'
		}
	}

	return axios.post(url, data, options)
}

export { uploadFile }
