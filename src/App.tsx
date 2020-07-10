import React from 'react'
import './App.css'
import { TasksPage } from './components/TasksPage'
import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'
import { Provider } from 'react-redux'
import {
  tasks,
  statuses,
  projects
} from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const App = () => {
  const store =
    createStore(
      combineReducers({
        tasks,
        statuses,
        projects
      }),
      composeWithDevTools(
        applyMiddleware(thunk)
      )
    )

  return (
    <Provider store={ store }>
      <div className="App">
        <div className="main-content">
          <TasksPage />
        </div>
      </div>
    </Provider>
  )
}

export default App
