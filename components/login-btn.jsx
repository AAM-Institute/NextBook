import { useSession, signIn, signOut } from "next-auth/react"
import { Dropdown } from "@nextui-org/react";


const LoginBtn = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <Dropdown>
        <Dropdown.Button color={'#ff0000'} light>
          <span className="hidden md:inline text-xs lg:text-sm">{session.user.email}</span> <img src={session.user.image} alt="avatar" className="rounded-full w-6 h-6 md:mx-2 lg:mr-0" />
        </Dropdown.Button>
        <Dropdown.Menu
          color={'#ff0000'}
          variant="light"
          aria-label="Actions"
          onAction={(key) => {
            console.log(key)

            switch (key) {
              case 'new':
                console.log('new')
                break
              case 'copy':
                console.log('copy')
                break
              case 'settings':
                console.log('settings')
                break
              case 'signout':
                console.log('signout')
                signOut()
                break
              default:
                console.log('default')
                break
            }
          }}
        >
          <Dropdown.Item key="settings">Settings</Dropdown.Item>
          <Dropdown.Item key="signout" color="error" withDivider>
            Log out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
  return (
    <>
      {/* Not signed in */}
      <button className="p-4 md:px-8" onClick={() => signIn()}>Sign in</button>
    </>
  )
}
export default LoginBtn