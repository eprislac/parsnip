import { TaskType } from '../components/Task'

const initStatuses = [
  'Unstarted',
  'In Progress',
  'Completed'
]

const initialTasks = {
  tasks: [],
  isLoading: false
}

const tasks = (state = initialTasks, action: any) => {
  switch(action.type) {
    case 'FETCH_TASKS_FAILED':
    case 'EDIT_TASK_FAILED':
    case 'DELETE_TASK_FAILED':
      console.warn(action.payload.error)
      return {
        ...state,
        error: action.error
      }
    case 'FETCH_TASKS_STARTED':
      return {
        ...state,
        isLoading: true
      }
    case 'FETCH_TASKS_SUCCEEDED':
      return {
        ...state,
        tasks: action.payload,
        isLoading: false
      }
    case 'EDIT_TASK_SUCCEEDED':
      const updatedTask = action.payload
      const updatedTasks =  state.tasks.map((task: TaskType) => {
        return task.id === updatedTask.id
          ? { ...task, ...updatedTask } :
          task
      })
      return {...state, tasks: updatedTasks }
    case 'CREATE_TASK_SUCCEEDED':
      return {
        ...state,
        tasks: [...(state.tasks), action.payload]
      }
    case 'DELETE_TASK_SUCCEEDED':
      const lessTasks = state
        .tasks
        .filter((task: TaskType) => task.id !== action.payload.id)
      return {
        ...state,
        tasks: lessTasks
      }
    case 'TIMER_INCREMENT':
      const nextTasks = state.tasks.map((task: TaskType) => {
        if (task.id === action.payload) {
          return { ...task, timer: task.timer + 1 }
        }
        return task
      })
      return {
        ...state,
        tasks: nextTasks
      }
    default:
      return state
  }
}

const statuses = (state = { statuses: initStatuses }, action: any) => {
  return state
}

const projects = (state = { projects: [] }, action: any) => {
  return state
}

const error = ( state = { error: null }, action: any) => {
  switch (action.type) {
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload.error
      }
    case 'GET_ERROR':
    default:
      return state
  }
}

export { tasks, statuses, projects, error }

