import { useQuery } from 'react-query'
import axios from 'axios'

import { endpoint } from '../app.config'

export const useSimpleQuery = (type, params) => {
  const deps = params ? Object.values(params) : []
  const { data, error, ...rest } = useQuery(
    [type, ...deps],
    async () => {
      const url = endpoint?.[type](params)
      console.log('url', url)
      return (await axios.get(url))?.data
    },
    { keepPreviousData: true, staleTime: 1000 * 60 }
  )

  return [data, error, rest]
}
