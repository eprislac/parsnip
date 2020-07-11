import React from 'react'
import { Toast, ToastBody, ToastHeader } from 'reactstrap'
import { setError } from '../actions'
import { useDispatch } from 'react-redux'

import './FlashMessage.scss'

export const FlashMessage = (props: any) => {
  const dispatch = useDispatch()
  const {title, message} = props
  const toggle = () => {
    switch(title) {
      case 'Error':
        dispatch(setError(''))
    }
  }

  return (
    <div className={`toast-wrapper`}>
      <Toast className={`flash-message ${ title.toLowerCase() }`}>
        <ToastHeader toggle={toggle}>{title}</ToastHeader>
        <ToastBody>
          { message }
        </ToastBody>
      </Toast>
    </div>
  )
}

FlashMessage.defaultProps = { message: 'an error occurred' }
