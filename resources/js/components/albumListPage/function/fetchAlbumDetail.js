import axios from 'axios'

const fetchAlbumDetail = (id, params = {}) => {
	const url = `/api/album/${id}`
	const options = {
		params,
		headers: {}
	}

	return axios.get(url, options)
}

export { fetchAlbumDetail }
