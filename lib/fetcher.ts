const fetcher = (url: string, data?: object) => {
  let fetchData = fetch(`${window.location.origin}/api${url}`, {
    method: data ? 'POST' : 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) {
      throw res
    }
    return res.json()
  })
  return {
    then(callback: (data: object) => void) {
      fetchData = fetchData.then(callback)
      return this
    },
    catch: (errorCallback: (error) => void) => {
      fetchData
        .catch((err) => {
          try {
            return err.json()
          } catch (e) {
            console.error('Received non-json from API')
          }
        })
        .then(errorCallback)
    },
  }
}

export default fetcher
