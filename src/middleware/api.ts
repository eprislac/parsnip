import axios from 'axios'

const API_BASE_URL = 'http://localhost:3001'
const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const CALL_API = 'CALL_API'

export const apiMiddleware = (store: any) => (next: any) => (action: any) => {
  const callApi = action[CALL_API]
  if(typeof callApi === 'undefined') {
    return next(action)
  }

  const [requestStartedType, successType, failureType] = callApi.types

  next({type: requestStartedType})

  const request = (call: any) => {
    const {method, body, endpoint} = call
    switch(method) {
      case 'get':
        return client.get(endpoint)
      case 'post':
        return client
          .post(endpoint, body)
          .then((response: any) => response)
          .catch((error: any) => error)
      case 'put':
        return client
          .put(`${endpoint}/${body.id}`, body)
      case 'delete':
        return client
          .delete(`${endpoint}/${body}`)
      default:
        return client.get(endpoint)
    }
  }

  const makeCall = (call: any) => {
    return request(call)
      .then((response: any) => response)
      .catch((error: any) => error)
  }

  return request(callApi)
    .then(
        (response: any) => {
          const payload =
            callApi.method === 'delete' ? { id: callApi.body } : response.data
          next({
            type: successType,
            payload: payload
          })
        },
        (error: any) => {
          next({
            type: failureType,
            error: error.message
          })
        }
      )
}

export default apiMiddleware
