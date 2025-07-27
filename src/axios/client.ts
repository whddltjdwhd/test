import axios from 'axios'

import {baseURL} from '../baseURL'

const clientApi = axios.create({
    baseURL,
})

export default clientApi
