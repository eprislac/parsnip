let _id = 1
export const uniqueId = () => _id++

export const createTask = ({ title, description, status }: any) => {
  return {
    type: 'CREATE_TASK',
    payload: {
      id: uniqueId(),
      title: title,
      description: description,
      status: status
    }
  }
}

export const updateTask = ({id, title, description, status}: any) => {
  return {
    type: 'UPDATE_TASK',
    payload: { id, title, description, status }
  }
}

export const deleteTask = (id: number) => {
  return {
    type: 'DELETE_TASK',
    payload: {id}
  }
}
