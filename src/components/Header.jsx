import { Link } from 'react-router-dom';
import '../style/Header.css'
import PropTypes from 'prop-types';

Header.propTypes = {
  authenticated: PropTypes.bool,
  setAuthenticated: PropTypes.func
}

export default function Header({authenticated, setAuthenticated}){
  const handleLogOut = () =>{
    setAuthenticated(false);
    localStorage.clear();
    localStorage.setItem("userAuth", false);
  }

  return(
    <header>
      <div className='logoContainer'>
        <Link to="/" className='logoLink'>
          <h1 className="headerPseudo">Pseudo</h1>
          <h1 className="headerBlog">Blog</h1>
        </Link>
      </div>
      { authenticated ? 
        <div className='headerItem' onClick={handleLogOut}>
          <Link to="/" className='headerItemLink'>
            <p className='headerItemText'>Log Out</p>
          </Link>
        </div> : 
        <div className='headerItem'>
          <Link to="/logIn" className='headerItemLink'>
            <p className='headerItemText'>Log In</p>
          </Link>
        </div>
      }
    </header>
  )
}