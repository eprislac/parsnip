import React from 'react'
import logo from './logo.svg'
import './App.css'
import { TasksPage } from './components/TasksPage'
import { TaskType } from './components/Task'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { tasks, statuses } from './reducers'
import { devToolsEnhancer, composeWithDevTools } from 'redux-devtools-extension'
const App = () => {
  const store =
    createStore(combineReducers({tasks, statuses}), composeWithDevTools())

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
