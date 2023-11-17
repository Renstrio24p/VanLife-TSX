import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="vans-notfound">
      <h1>Sorry, the page you were looking for wasn't exist.</h1>
      <NavLink to={"/"} className={"button"}>
        Return to home
      </NavLink>
    </div>
  )
}
