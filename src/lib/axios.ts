import axios from 'axios'

import {API_BASE_URL} from '../constants/api'

// axios 인스턴스 생성
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})
