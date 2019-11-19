import axios from 'axios';

const api = axios.create({
	baseURL: 'http://192.168.11.7:8080'
})

export default api