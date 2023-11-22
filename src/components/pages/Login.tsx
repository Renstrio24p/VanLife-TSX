import { ReactNode } from "react"
import {
    useLoaderData,
    useNavigation,
    Form,
    redirect,
    useActionData
} from "react-router-dom"
import { loginUser } from "../api"

export function loader({ request }: {request: Request}) {
    return new URL(request.url).searchParams.get("message")
}


export async function action({ request }: {request: Request}) {
    const formData = await request.formData()
    const email = formData.get("email") 
    const password = formData.get("password") 
    const pathname = new URL(request.url).searchParams.get("redirectTo") || '/host'
    try {
        await loginUser({ email, password })
        localStorage.setItem("loggedIn", 'true')
        return redirect(pathname)
    } catch(err: any) {
        return err.message
    }
}

export default function Login() {
    const errorMessage = useActionData() as ReactNode
    const message = useLoaderData() as ReactNode
    const navigation = useNavigation()

    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            {message && <h3 className="red">{message}</h3>}
            {errorMessage && <h3 className="red">{errorMessage}</h3>}

            <Form 
                method="post" 
                className="login-form" 
                replace
            >
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <button
                    disabled={navigation.state === "submitting"}
                >
                    {navigation.state === "submitting"
                        ? "Logging in..."
                        : "Log in"
                    }
                </button>
            </Form>
        </div>
    )
}
