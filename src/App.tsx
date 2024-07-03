import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from './pages/SignIn/ui/SignIn'
import SignUp from './pages/SignUp/ui/SignUp'
import Profile from './pages/Profile/ui/Profile'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <SignIn />,
    },
    {
      path: '/sign-in',
      element: <SignIn />,
    },
    {
      path: '/sign-up',
      element: <SignUp />,
    },
    {
      path: '/change-data',
      element: <Profile />,
    },
  ])

  return (
    <div className="flex h-screen flex-col bg-gray-100 font-sans leading-none">
      <header className="my-7 flex w-full justify-center">
        <svg
          width="32"
          height="13"
          viewBox="0 0 32 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.1921 6.24273L29.8083 0.5849L31.5556 2.11833L21.012 12.2178L16.1921 8.04055L11.4324 12.2178L0.888885 2.11833L2.6361 0.5849L16.1921 6.24273Z"
            fill="#E64B4B"
          />
        </svg>
      </header>
      <div className="-mt-[69px] flex h-full items-center justify-center">
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App
