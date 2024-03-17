import { Component } from "react";
import { Link } from "react-router-dom";
// import PropTypes from 'prop-types';
import '../style/Header.css'

// import Icon from '@mdi/react';

class Header extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        <div className='logoContainer'>
          <Link to="/" className='logoLink'>
            <h1 className="headerPseudo">Pseudo</h1>
            <h1 className="headerBlog">Blog</h1>
          </Link>
        </div>
        <div className='headerItem'>
          <Link to="/logIn" className='headerItemLink'>
            <p className='headerItemText'>Log In</p>
          </Link>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  // cartLength: PropTypes.number
}


export default Header

