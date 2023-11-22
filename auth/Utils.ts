import { redirect } from "react-router-dom"

export async function requireAuth({request}: {request: Request}) {
    
  const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host"

  const isLoggedIn = localStorage.getItem('loggedIn')
    
    if (!isLoggedIn) {
        throw redirect(
          `/login?message=You must log in first.&redirectTo=${pathname}`
        )
    }
}