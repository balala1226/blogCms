import { Outlet } from "react-router-dom";
// import PropTypes from 'prop-types';
import { Component } from "react";
import Header from './Header';
import Footer from "./Footer";

class Layout extends Component{
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <>
          <Header/>
          <Outlet />
          <Footer />
        </>
      );
    }
}

// Layout.propTypes = {
//   cartLength: PropTypes.number
// }
  
export default Layout