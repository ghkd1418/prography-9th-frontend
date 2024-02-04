import { RouterProvider } from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout'
import router from './routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { QUERY_CLIENT_OPTIONS } from './constants/reactQuery'

function App() {
  const [queryClient] = useState(() => new QueryClient(QUERY_CLIENT_OPTIONS))

  return (
    <QueryClientProvider client={queryClient}>
      <DefaultLayout>
        <RouterProvider router={router} />
      </DefaultLayout>
    </QueryClientProvider>
  )
}

export default App
