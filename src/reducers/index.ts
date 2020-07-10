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
      return state
    case 'FETCH_TASKS_STARTED':
      return {
        ...state,
        isLoading: true
      }
    case 'FETCH_TASKS_SUCCEEDED':
      return {
        ...state,
        tasks: action.payload.tasks,
        isLoading: false
      }
    case 'EDIT_TASK_SUCCEEDED':
      const updatedTask = action.payload
      const updatedTasks =  state.tasks.map((task: TaskType) => {
        return task.id === updatedTask.id ? updatedTask : task
      })
      return {...state, tasks: updatedTasks }
    case 'CREATE_TASK_SUCCEEDED':
      const newTask = action.payload
      const newTasks = [...(state.tasks), newTask]
      return { ...state, tasks: newTasks }
    case 'DELETE_TASK_SUCCEEDED':
      const lessTasks = state
        .tasks
        .filter((task: TaskType) => task.id !== action.payload.id)
      return {
        ...state,
        tasks: lessTasks
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

export { tasks, statuses, projects }

