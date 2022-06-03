import '../styles/Navbar.css'
import axios from "axios";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, toggleAuth } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("/api/me")
      .then((res) => res.data)
      .then((cookieUser) => {
        if (cookieUser.id) {
          toggleAuth(cookieUser);
          navigate("/search");
        }
      })
      .catch((err) => {
        if ((err.response.status = 401)) navigate("/login");
      });
  }, []);

  const handleLogOut = () => {
    axios.get("/api/logout").then(() => {
      toggleAuth(null);
      navigate("/login");
    });
  };

  if (isAuthenticated)
    return (
      <div className='nav-bgnd'>
        <h1 className="nav-title">
        <Link to="/search">
          <img className='nav-img' src={process.env.PUBLIC_URL + "/marle.png"} alt='logo' />
          </Link>
          TMDB by Pablo
        </h1>
        <h2 className='nav-subtitle'>
          <div className='nav-buttons'>
            <Link to="/login">
              <button className='nav-button' onClick={handleLogOut}>Log out</button>
            </Link>
            <Link to={`/users/${user.id}/favorites`}>
              <button className='nav-button'>Ver Favoritos</button>
            </Link>
          </div>
              Bienvenido {user.username.slice(0,1).toUpperCase()}{user.username.slice(1)}
        </h2>
      </div>
    );
  return (
    <div className='nav-bgnd'>
      <h1 className='nav-title'>
        <Link to="/login">
          <img className='nav-img2' src={process.env.PUBLIC_URL + "/marle.png"} alt='logo' />
        </Link>
        TMDB by Pablo
      </h1>
    </div>
  );
};

export default Navbar;
