import { call, fork, put, take, takeLatest } from 'redux-saga/effects'
import * as api from './api'

function* fetchTasks() {
  try {
    const { data } = yield call(api.fetchTasks)
    yield put({
      type: 'FETCH_TASKS_SUCCEEDED',
      payload: data
    })
  }
  catch (error){
    yield put({
      type: 'FETCH_TASKS_FAILED',
      payload: { error: error.message }
    })
  }
  finally {}
}

function* createTask(action: any) {
  try {
    const task = action.payload
    const { data } = yield call(api.createTask, task)
    yield put({
      type: 'CREATE_TASK_SUCCEEDED',
      payload: data
    })
  }
  catch (error){
    yield put({
      type: 'CREATE_TASKS_FAILED',
      payload: { error: error.message }
    })
  }
  finally {}
}

function* editTask(action: any) {
  try {
    const task = action.payload
    const { data } = yield call(api.editTask, task)
    yield put({
      type: 'EDIT_TASK_SUCCEEDED',
      payload: data
    })
  }
  catch (error){
    yield put({
      type: 'EDIT_TASKS_FAILED',
      payload: { error: error.message }
    })
  }
  finally {}
}

function* deleteTask(action: any) {
    try {
      const id = action.payload
      const { data } = yield call(api.deleteTask, id)
      yield put({
        type: 'DELETE_TASK_SUCCEEDED',
        payload: { id: id }
      })
    }
    catch (error){
      yield put({
        type: 'DELETE_TASKS_FAILED',
        payload: { error: error.message }
      })
    }
    finally {}
}

function* watchSomethingElse() {
  yield console.log('watching something else!')
}

export default function* rootSaga() {
  yield takeLatest('FETCH_TASKS_STARTED', fetchTasks)
  yield takeLatest('CREATE_TASK_STARTED', createTask)
  yield takeLatest('EDIT_TASK_STARTED', editTask)
  yield takeLatest('DELETE_TASK_STARTED', deleteTask)
}


