import axios from 'axios'

const updateAlbum = (id, data, params = {}) => {
	const url = `/api/album/${id}`
	const options = {
		params,
		headers: {}
	}

	return axios.put(url, data, options)
}

export { updateAlbum }
