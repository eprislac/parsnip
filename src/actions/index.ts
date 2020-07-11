import * as api from '../api'
import { TaskType } from '../components/Task'

let _id = 1
export const uniqueId = () => _id++

export const updateTask = ({id, title, description, status}: any) => {
  return {
    type: 'UPDATE_TASK',
    payload: { id, title, description, status }
  }
}

export const fetchTasks = () => {
  return (dispatch: any) => {
    dispatch({type: 'FETCH_TASKS_STARTED'})
    api
      .fetchTasks()
      .then((resp: any) => {
        setTimeout(() => {
          dispatch(fetchTasksSucceeded(resp.data))
        }, 2000)
      })
      .catch((err: Error) => dispatch(fetchTasksFailed(err)))
  }
}

export const fetchTasksStarted = () => {
  return {
    type: 'FETCH_TASKS_STARTED'
  }
}

export const fetchTasksSucceeded = (tasks: any) => {
  return {
    type: 'FETCH_TASKS_SUCCEEDED',
    payload: { tasks: tasks }
  }
}

export const fetchTasksFailed = (error:any) => {
  return (dispatch:any) => dispatch(setError('Failed to fetch tasks'))
}

export const createTaskSucceeded = (task: any) => {
  return {
    type: 'CREATE_TASK_SUCCEEDED',
    payload: task
  }
}

export const createTaskFailed = (error:any) => {
  return (dispatch:any) => dispatch(setError('Failed to create task'))
}

export const createTask = (task: TaskType) => {
  return (dispatch: any) => {
    api
      .createTask(task)
      .then((resp:any) => dispatch(createTaskSucceeded(resp.data)))
      .catch((err: Error) => dispatch(createTaskFailed(err)))
  }
}

export const editTaskSucceeded = (task: TaskType) => {
  return {
    type: 'EDIT_TASK_SUCCEEDED',
    payload: task
  }
}

export const editTaskFailed = (error: Error) => {
  return (dispatch:any) => dispatch(setError('Failed to save edited task'))
}

export const editTask = (task: TaskType) => {
  return (dispatch: any, getState: any) => {
    const oldTask = getTaskById(getState().tasks.tasks, task.id)
    const editedTask = { ...oldTask, ...task }

    api
      .editTask(editedTask)
      .then(resp => dispatch(editTaskSucceeded(resp.data)))
      .catch((err: Error) => dispatch(editTaskFailed(err)))
  }
}

export const getTaskById = (tasks: TaskType[], id: any) => {
  return tasks.find((task:TaskType) => task.id === id)
}

export const deleteTaskSucceeded = (id: any) => {
  return {
    type: 'DELETE_TASK_SUCCEEDED',
    payload: { id: id }
  }
}

export const deleteTaskFailed = (error: Error) => {
  return (dispatch:any) => dispatch(setError('Failed to delete task'))
}

export const deleteTask = (id: any) => {
  return (dispatch: any) =>{
    api
      .deleteTask(id)
      .then((resp) => dispatch(deleteTaskSucceeded(id)))
      .catch((err: Error) => dispatch(deleteTaskFailed(err)))
  }
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
