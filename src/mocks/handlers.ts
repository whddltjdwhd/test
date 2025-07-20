import {http, HttpResponse} from 'msw'

export const handlers = [
    http.get('http://localhost:3000/user', () => {
        return HttpResponse.json({
            name: '이성종',
            age: 30,
        })
    }),
]
