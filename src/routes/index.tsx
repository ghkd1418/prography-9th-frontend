import { createBrowserRouter } from 'react-router-dom'
import Header from '../components/common/Header'
import NotFound from '../pages/NotFound'
import Main from '../pages/Main'

const router = createBrowserRouter([
  {
    element: <Header />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
    ],
  },
])

export default router
