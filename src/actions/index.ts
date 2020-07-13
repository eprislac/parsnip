import { TaskType } from '../components/Task'
// import { CALL_API } from '../middleware/api'
import * as api from '../api'
export const FETCH_TASKS_STARTED = 'FETCH_TASKS_STARTED'
export const FETCH_TASKS_SUCCEEDED = 'FETCH_TASKS_SUCCEEDED'
export const FETCH_TASKS_FAILED = 'FETCH_TASKS_FAILED'
export const CREATE_TASK_STARTED = 'CREATE_TASK_STARTED'
export const CREATE_TASK_SUCCEEDED = 'CREATE_TASK_SUCCEEDED'
export const CREATE_TASK_FAILED = 'CREATE_TASKS_FAILED'
export const EDIT_TASK_STARTED = 'EDIT_TASK_STARTED'
export const EDIT_TASK_SUCCEEDED = 'EDIT_TASK_SUCCEEDED'
export const EDIT_TASK_FAILED = 'EDIT_TASKS_FAILED'
export const DELETE_TASK_STARTED = 'DELETE_TASK_STARTED'
export const DELETE_TASK_SUCCEEDED = 'DELETE_TASK_SUCCEEDED'
export const DELETE_TASK_FAILED = 'DELETE_TASKS_FAILED'

let _id = 1
export const uniqueId = () => _id++

export const updateTask = ({id, title, description, status}: any) => {
  return {
    type: 'UPDATE_TASK',
    payload: { id, title, description, status }
  }
}

export const fetchTasks = () => {
  return {
    type: FETCH_TASKS_STARTED
  }
}

export const createTask = (task: TaskType) => {
  return {
    type: CREATE_TASK_STARTED,
    payload: task
  }
}

export const progressTimerStart = (id: number) => {
  return {
    type: 'TIMER_STARTED',
    payload: { id: id }
  }
}

export const progressTimerStop = (id: number) => {
  return {
    type: 'TIMER_STOPPED',
    payload: { id: id }
  }
}

export const editTask = (task: TaskType) => {
  return (dispatch: any, getState: any) => {

    api.editTask(task).then((resp: any) => {
      dispatch(editTaskSucceeded(resp.data))
      if(resp.data.status === 'In Progress') {
        return dispatch(progressTimerStart(resp.data.id))
      } else if (resp.data.status !== 'In Progress') {
        return dispatch(progressTimerStop(resp.data.id))
      }
    })
  }
}

export const editTaskSucceeded = ({ id, status }: any) => {
  return {
    type: 'EDIT_TASK_SUCCEEDED',
    payload: { id, status }
  }
}

export const deleteTask = (id: number) => {
  return {
    type: DELETE_TASK_STARTED,
    payload: id
  }
}

export const getTaskById = (tasks: TaskType[], id: any) => {
  return tasks.find((task:TaskType) => task.id === id)
}

export const setError = (error: string) =>  {
  return {
    type: 'SET_ERROR',
    payload: {
      error: error
    }
  }
}

export const getError = () => ({ type: 'GET_ERROR' })

export const setMessage = (message: string) =>  {
  return {
    type: 'SET_MESSAGE',
    payload: {
      message: message
    }
  }
}

export const getMessage = () => ({ type: 'GET_MESSAGE' })

export const setWarning = (warning: string) =>  {
  return {
    type: 'SET_WARNING',
    payload: {
      warning: warning
    }
  }
}

export const getWarning = () => ({ type: 'GET_WARNING' })


