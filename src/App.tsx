import { RouterProvider } from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout'
import router from './routes'

function App() {
  return (
    <DefaultLayout>
      <RouterProvider router={router} />
    </DefaultLayout>
  )
}

export default App
