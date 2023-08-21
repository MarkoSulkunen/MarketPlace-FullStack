import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
  /* Get the auth context */
  const auth = useContext(AuthContext);

  /* Render navigation links */
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          PRODUCTS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/myproducts" exact>
            MY PRODUCTS
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/products/new">ADD PRODUCT</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/signup">SignUp</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};
export default NavLinks;
