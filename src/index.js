import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import { StoreProvider } from './store'
import App from './App'

const queryClient = new QueryClient()
const rootElement = document.getElementById('root')
ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <App />
        </StoreProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
  rootElement
)
