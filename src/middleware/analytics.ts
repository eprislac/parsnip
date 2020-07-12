const analytics = (store: any) => (next: any) => (action: any)  => {
  if(!action || !action.meta || !action.meta.analytics) {
    return next(action)
  }

  const { event, data } = action.meta.analytics;

  fakeAnalyticsApi(event, data)
    .then((resp: any) => console.log('Recorded: ', event, data))
    .catch((err: Error) => {
      console
        .error('An error occurred while sending analytics: ', err.toString())
    })

  return next(action)
}


const fakeAnalyticsApi = (eventName: string, data: any) => {
  return new Promise((resolve: any, reject: any) => {
    resolve('Success!')
  })
}

export default analytics
