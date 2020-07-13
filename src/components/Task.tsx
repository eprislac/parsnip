import React from 'react'
import { useDispatch } from 'react-redux'
import { editTask, deleteTask } from '../actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Task.scss'

export type TaskType = {
  id?: number
  title?: string
  description?: string
  status?: string
  timer: number
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
      editTask({
        ...task,
        status: event.target.value
      })
    )
  }

  const handleDelete = (event: any) => {
    dispatch(deleteTask(task.id || 0))
  }

  return (
    <div className="task">
      <div className="task-header">
        <div style={{minWidth: '65%'}}>{ task.title }</div>
        <div style={{minWidth: '25%'}}>
          <select
            className="form-control"
            onChange={ handleChange }
            value={ task.status }
            data-chosen={ task.status }>
            <option key="Unstarted" value="Unstarted">Unstarted</option>
            <option key="In Progress" value="In Progress">In Progress</option>
            <option key="Completed" value="Completed">Completed</option>
          </select>
        </div>
        <div style={{minWidth: '10%'}}>
          <FontAwesomeIcon
            icon="trash"
            onClick={ handleDelete }/>
        </div>
      </div>
      <div className="task-body">
        { task.description }
        <div className="task-timer">{task.timer}s</div>
      </div>
    </div>
  )
}
