import axios from 'axios'

const updatePicture = (id, data, params = {}) => {
	const url = `/api/pic/${id}`
	const options = {
		params,
		headers: {}
	}

	return axios.put(url, data, options)
}

export { updatePicture }
