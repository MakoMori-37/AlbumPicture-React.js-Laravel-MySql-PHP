import axios from 'axios'

const deleteAlbum = (id, params = {}) => {
	const url = `/api/album/${id}`
	const options = {
		params,
		headers: {}
	}

	return axios.delete(url, options)
}

export { deleteAlbum }
