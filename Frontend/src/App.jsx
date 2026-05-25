import {RouterProvider} from 'react-router'
import {router} from './app.routes.jsx'
import {AuthProvider} from './context/auth.provider.jsx'

function App() {

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
    </>
  )
}

export default App
