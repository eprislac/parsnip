import axios from 'axios'
import { TaskType } from '../components/Task'

const API_BASE_URL = 'http://localhost:3001'

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const fetchTasks =
  () => client.get('/tasks')


export const createTask =
  (task: TaskType) => client.post('/tasks', task)

export const editTask =
  (task: TaskType) => client.put(`/tasks/${task.id}`, task)

export const deleteTask =
  (id: any) => client.delete(`/tasks/${id}`)
