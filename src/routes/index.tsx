import { createBrowserRouter } from 'react-router-dom'
import Header from '../components/common/Header'
import NotFound from '../pages/NotFound'
import Home from '../pages/Home'

const router = createBrowserRouter([
  {
    element: <Header />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
])

export default router
