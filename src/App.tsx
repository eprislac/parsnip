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
  projects,
  error
} from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import createMiddlewareSaga from 'redux-saga'
// import apiMiddleware from './middleware/api'
import rootSaga from './sagas'

const App = () => {
  const sagaMiddleware = createMiddlewareSaga()
  const store =
    createStore(
      combineReducers({
        tasks,
        statuses,
        projects,
        error
      }),
      composeWithDevTools(
        applyMiddleware(
          thunk,
          sagaMiddleware
        )
      )
    )
  sagaMiddleware.run(rootSaga)

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
