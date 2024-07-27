import { signIn, signOut, useSession } from "next-auth/react"
import { useState } from "react"

const ADMINS = [
  'admin@lacymorrow.com',
  'jason.rogewitz@gmail.com'
]

const LoginBtn = () => {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  if (session) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
        >
          <span className="hidden md:inline text-xs lg:text-sm">{session.user.email}</span>
          <img src={session.user.image} alt="avatar" className="rounded-full w-6 h-6 md:mx-2 lg:mr-0" />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
            {ADMINS.includes(session.user.email) && (
              <button
                onClick={() => console.log('edit')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Edit Page
              </button>
            )}
            <button
              onClick={() => signOut()}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    )
  }
  return (
    <button
      className="p-4 md:px-8 hover:bg-gray-100 rounded-md"
      onClick={() => signIn()}
    >
      Sign in
    </button>
  )
}

export default LoginBtn