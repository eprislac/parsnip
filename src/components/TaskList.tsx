import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Task, TaskType } from './Task'
import { createTask } from '../actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type TaskListPropsType = {
  status: string
  tasks: TaskType[]
  isLoading: boolean
}

export const TaskList = (props: TaskListPropsType) => {
  const initTask = {
    title: '',
    description: ''
  }

  const [formOpen, setFormOpen] = useState(false)
  const [title, setTitle] = useState(initTask.title)
  const [description, setDescription] = useState(initTask.description)

  const dispatch = useDispatch()

  const handleCreate = (event: any) => {
    dispatch(
      createTask({
        title: title,
        description: description,
        status: props.status,
        timer: 0
      }))
    setTitle('')
    setDescription('')
    toggleFormOpen()
  }

  const toggleFormOpen = () => {
    setFormOpen(!formOpen)
  }

  return (
    <div className="task-list">
      <div className="task-list-title">
        <strong>{props.status}</strong>
        <FontAwesomeIcon icon="plus" onClick={ toggleFormOpen }/>
      </div>
      <div className={`task-form ${ formOpen ? '' : 'hidden' }`}>
        <input className="form-control" type="text" placeholder="Task Title" onChange={ (e) => setTitle(e.target.value) } />
        <textarea className="form-control" placeholder="Task Description" onChange={ (e) => setDescription(e.target.value) } />
        <button className="btn btn-primary" onClick={ handleCreate }>
          <FontAwesomeIcon icon="save"  />&nbsp;Save
        </button>
      </div>
      {
        props.isLoading && (
          <div>
            <FontAwesomeIcon
              icon="cog"
              size="2x"
              spin={true}
              style={{color: '#eee'}}
            />
          </div>
        )
      }
      { !props.isLoading && props.tasks.map(task => (
          <Task key={task.id} task={task} />)
        )
      }
    </div>
  )
}

