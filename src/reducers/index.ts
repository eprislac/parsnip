import { TaskType } from '../components/Task'
import { uniqueId } from '../actions'

const mockTasks: TaskType[] = [
  {
    id: uniqueId(),
    title: 'Learn Redux',
    description: 'The store, actions, and reducers, oh my!',
    status: 'In Progress'
  },
  {
    id: uniqueId(),
    title: 'Peace on Earth',
    description: 'No big deal.',
    status: 'In Progress'
  }
]

const initStatuses = [
  'Unstarted',
  'In Progress',
  'Completed'
]

const tasks = (state = { tasks: mockTasks }, action: any) => {
  switch(action.type) {
    case 'UPDATE_TASK':
      const updatedTask = action.payload
      const updatedTasks =  state.tasks.map((task: TaskType) => {
        return task.id === updatedTask.id ? updatedTask : task
      })
      return {...state, tasks: updatedTasks }
    case 'CREATE_TASK':
      const newTask = action.payload
      const newTasks = [...(state.tasks), newTask]
      return { ...state, tasks: newTasks }
    case 'DELETE_TASK':
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

export { tasks, statuses }

