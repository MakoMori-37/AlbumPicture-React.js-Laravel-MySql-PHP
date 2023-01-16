import axios from 'axios'

const createAlbum = (data, params = {}) => {
	const url = '/api/album'
	const options = {
		params,
		headers: {}
	}

	return axios.post(url, data, options)
}

export { createAlbum }
