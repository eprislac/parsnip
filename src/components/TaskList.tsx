import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Task, TaskType } from './Task'
import { createTask } from '../actions'

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
        status: props.status
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
        <button className="create-button" onClick={ toggleFormOpen }>
          <strong>+</strong>
        </button>
      </div>
      <div className={`task-form ${ formOpen ? '' : 'hidden' }`}>
        <input type="text" placeholder="Task Title" onChange={ (e) => setTitle(e.target.value) } />
        <textarea placeholder="Task Description" onChange={ (e) => setDescription(e.target.value) } />
        <button onClick={ handleCreate }>Save</button>
      </div>
      { props.isLoading && (<div>Loading...</div>) }
      { !props.isLoading && props.tasks.map(task => (
          <Task key={task.id} task={task} />)
        )
      }
    </div>
  )
}

