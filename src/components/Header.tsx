import { NavLink, Link} from "react-router-dom";
import { images } from "./Images";

export default function Header() {

  function fakeLogOut() {
    localStorage.removeItem("loggedIn")
  }

  return (
    <header>
        <Link className="site-logo" to="/">#VanLife</Link>
        <nav>
          <NavLink to="/host" className={({isActive}) => isActive ? "my-link" : "" }>Host</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? "my-link" : "" }>About</NavLink>
          <NavLink to="/vans" className={({isActive}) => isActive ? "my-link" : "" }>Vans</NavLink>
          { localStorage.getItem('loggedIn') ? <button className="logout-btn" onClick={fakeLogOut}>Log out</button> : 
            <Link to="login" className="login-link">
            <img 
                src={images.AvatarImg} 
                className="login-icon"
            />
            </Link>
          }
        </nav>
      </header>
  )
}