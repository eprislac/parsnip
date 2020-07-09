import React from 'react'
import { useDispatch } from 'react-redux'
import { updateTask, deleteTask } from '../actions'
import './Task.scss'

export type TaskType = {
  id: number
  title: string
  description: string
  status: string
}

type TaskPropsType = {
  task: TaskType
}

export const Task = (props: TaskPropsType) => {
  const { task } = props
  const dispatch = useDispatch()

  const handleChange = (event: any) => {
    event.target.dataset.chosen = event.target.value
    dispatch(
      updateTask({
        ...task,
        status: event.target.value
      })
    )
  }

  const handleDelete = (event: any) => {
    dispatch(deleteTask(task.id))
  }

  return (
    <div className="task">
      <div className="task-header">
        <div>{ task.title }</div>
        <div>
          <select
            onChange={ handleChange }
            value={ task.status }
            data-chosen={ task.status }>
            <option key="Unstarted" value="Unstarted">Unstarted</option>
            <option key="In Progress" value="In Progress">In Progress</option>
            <option key="completed" value="Completed">Completed</option>
          </select>
          <button
            className="delete-button"
            onClick={ handleDelete }>
            &times;
          </button>
        </div>
      </div>
      <div className="task-body">
        { task.description }
      </div>
    </div>
  )
}
