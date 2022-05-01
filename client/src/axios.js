import axios from 'axios'

const setBase = axios.create({baseURL: "http://localhost:5000/"})

export default setBase;