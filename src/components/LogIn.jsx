import { Component } from "react";
import { Link } from "react-router-dom";
// import PropTypes from 'prop-types';
import '../style/LogIn.css'

class LogIn extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className='content'>
            <h1>Log in</h1>
            <p>form here</p>
            <p>Do not have an account?
                <Link to="/signIn" className='registerLink'>
                    Register
                </Link>
            </p>
        </div>
      </>
    );
  }
}

export default LogIn

