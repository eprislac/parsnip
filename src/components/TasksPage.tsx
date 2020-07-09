import React, { Component,  useState } from 'react'
import { TaskList } from './TaskList'
import { TaskType } from './Task'
import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'

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
      return state.tasks.filter((task: TaskType) => task.status === status)
    }
  )
}

type TasksProps = { status: string }

const Tasks = (props: TasksProps) => {
  const status = props.status
  const statusTasks = useSelector(statusTasksSelector(status))
  return (
    <TaskList
      key={ status }
      status= { status }
      tasks={ statusTasks } />
  )
}

export const TasksPage = () => {
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
    <div className="tasks">
      <div className="task-lists">
        { renderTaskLists() }
      </div>
    </div>
  )
}
