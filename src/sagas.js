import { fork } from 'redux-saga/effects'

function* watchFetchTasks() {
  yield console.log('watching!')
}

function* watchSomethingElse() {
  yield console.log('watching something else!')
}

export function* rootSaga() {
  yield fork(watchFetchTasks)
  yield fork(watchSomethingElse)
}


