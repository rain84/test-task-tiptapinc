import { useState, useEffect } from 'react'

export const useFetch = (endpoints, deps = []) => {
  if (typeof endpoints === 'string') {
    endpoints = [endpoints]
  }

  let [data, setData] = useState(null)
  let [error, setError] = useState(null)

  useEffect(() => {
    ;(async () => {
      if (!endpoints) return

      try {
        let promises = endpoints.map((endpoint) => fetch(endpoint))
        const responses = await Promise.allSettled(promises)

        promises = responses.map(({ value }) => value.json())
        const data = (await Promise.allSettled(promises)).map(
          ({ value }) => value
        )

        setData(data)
      } catch (e) {
        setError(e.message)
      }
    })()
  }, deps)

  if (data?.length === 1) data = data[0]
  if (error?.length === 1) error = error[0]

  return [data, error]
}
