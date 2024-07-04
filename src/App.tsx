import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import Profile from './pages/Profile/Profile'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
import { SVGIcon } from './shared/ui/SVGIcon'
import { useAppSelector } from './shared/hooks'

const ProtectedRoute = ({ element }: { element: React.JSX.Element }) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth)
  if (!isLoggedIn) {
    return <Navigate to="/sign-in" />
  }
  return element
}

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
      path: '/profile',
      element: <ProtectedRoute element=<Profile /> />,
    },
  ])

  return (
    <div className="flex h-screen flex-col bg-gray-100 font-sans leading-none">
      <header className="my-7 flex w-full justify-center">
        <SVGIcon iconId="logo" width={32} height={13} />
      </header>
      <div className="-mt-[69px] flex h-full items-center justify-center">
        <Toaster
          position="top-right"
          closeButton={true}
          icons={{
            warning: <SVGIcon iconId="toast" width={28} height={28} />,
          }}
          toastOptions={{
            unstyled: true,
            classNames: {
              toast:
                'top-5 me-5 md:me-0 md:right-5 ms-auto rounded-xl p-5 realtive flex gap-3 w-[200px] items-center max-w-48',
              title: 'text-black text-xs font-medium',
              closeButton:
                'ms-auto absolute -right-1 top-2 stroke-black/50 border-none bg-transparent hover:bg-yellos-50',
              warning: 'text-black text-xs font-medium bg-yellow-50',
              success: 'text-black text-xs font-medium bg-green-100',
            },
          }}
        />
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App
