import { channel } from 'redux-saga'
import {
  call,
  delay,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects'
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

// function* editTask(action: any) {
//   try {
//     const task = action.payload
//     const { data } = yield call(api.editTask, task)
//     yield put({
//       type: 'EDIT_TASK_SUCCEEDED',
//       payload: data
//     })
//     debugger
//     if(task.status === 'In Progress') {
//       yield put({
//         type: 'TIMER_STARTED',
//         payload: { id: action.payload.id }
//       })
//     } else {
//       yield put({
//         type: 'TIMER_STOPPED',
//         payload: { id: action.id }
//       })
//     }
//   }
//   catch (error){
//     yield put({
//       type: 'EDIT_TASKS_FAILED',
//       payload: { error: error.message }
//     })
//   }
//   finally {}
// }


function* deleteTask(action: any) {
    try {
      const id = action.payload
      yield call(api.deleteTask, id)
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

function* handleTimerStarted({id}: any) {
  while(true) {
    yield delay(1000)
    yield put({
      type: 'TIMER_INCREMENT',
      payload: id
    })
  }
}

function* handleTimerStopped({ id }: any) {
  yield put({
    type: 'TIMER_STOP',
    payload: id
  })
}

function* handleProgressTimer({payload, type}:any) {
  if (type === 'TIMER_STARTED') {
    yield handleTimerStarted(payload)
  } else if (type === 'TIMER_STOPPED') {
    yield handleTimerStopped(payload)  }
}

function* takeLatestById (actionType: any, saga: any) {
  const channelsMap:any = {}
  while (true) {
    const action = yield take(actionType)
    const { id } = action.payload
    if(!channelsMap[id]) {
      channelsMap[id] = channel()
      yield takeLatest(channelsMap[id], saga)
    }
    yield put(channelsMap[id], action)
  }
}

export default function* rootSaga() {
  yield takeLatest('FETCH_TASKS_STARTED', fetchTasks)
  yield takeLatest('DELETE_TASK_STARTED', deleteTask)
  yield takeLatest('CREATE_TASK_STARTED', createTask)
  yield takeLatestById(['TIMER_STARTED', 'TIMER_STOPPED'], handleProgressTimer)
}


