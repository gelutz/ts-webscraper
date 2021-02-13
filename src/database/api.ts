import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:5444'
})

export default api