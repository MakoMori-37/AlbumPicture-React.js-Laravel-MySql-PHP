import axios from 'axios'

const deletePicture = (id, params = {}) => {
	const url = `/api/pic/${id}`
	const options = {
		params,
		headers: {}
	}

	return axios.delete(url, options)
}

export { deletePicture }
