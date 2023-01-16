import axios from 'axios'

const createPicture = (data, params = {}) => {
	const url = '/api/pic'
	const options = {
		params,
		headers: {}
	}

	return axios.post(url, data, options)
}

export { createPicture }
