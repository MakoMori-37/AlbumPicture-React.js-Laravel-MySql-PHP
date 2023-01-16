import axios from 'axios'

const fetchAlbum = (params = {}) => {
	const url = '/api/album'
	const options = {
		params,
		headers: {}
	}

	return axios.get(url, options)
}

export { fetchAlbum }
