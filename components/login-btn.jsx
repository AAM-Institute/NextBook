import { useSession, signIn, signOut } from "next-auth/react"

const LoginBtn = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        {/* Signed in as {session.user.email} <br /> */}
        <button className="p-4 md:px-8" onClick={() => signOut(
          {
            callbackUrl: `${window.location.origin}`
          }
        )}>Sign out</button>
      </>
    )
  }
  return (
    <>
      {/* Not signed in <br /> */}
      <button className="p-4 md:px-8" onClick={() => signIn()}>Sign in</button>
    </>
  )
}
export default LoginBtn