import React, { useEffect } from 'react'
import { TaskList } from './TaskList'
import { TaskType } from './Task'
import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'
import { fetchTasks, getError } from '../actions'
import { FlashMessage } from './FlashMessage'

import './TaskList.scss'


const TASK_STATUSES = [
  'Unstarted',
  'In Progress',
  'Completed'
]


const statusTasksSelector = (status: string) => {
  return createSelector(
    (state: any) => state.tasks,
    (state: any) => {
      return {
        tasks: state.tasks.filter((task: TaskType) => task.status === status),
        isLoading: state.isLoading
      }
    }
  )
}

const errorSelector = () => {
  return createSelector(
    (state: any) => state.error,
    (state: any) => state.error
  )
}

type TasksProps = { status: string }

const Tasks = (props: TasksProps) => {
  const status = props.status
  const dispatch = useDispatch()
  const {tasks, isLoading} = useSelector(statusTasksSelector(status))

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  return (
    <TaskList
      key={ status }
      status= { status }
      tasks={ tasks }
      isLoading={ isLoading }
    />
  )
}

export const TasksPage = () => {
  const error = useSelector(errorSelector())
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getError())
  }, [dispatch])

  const renderTaskLists = () => {
    return TASK_STATUSES.map((status, index) => {
      return (
        <Tasks
          status={ status }
          key={ `${status.split(' ').join('')}-${index}` } />
      )
    })
  }

  return (
    <>
    { error && <FlashMessage title="Error" message={ error } /> }
    <div className="tasks">
      <div className="task-lists">
        {  renderTaskLists() }
      </div>
    </div>
  </>
  )
}
