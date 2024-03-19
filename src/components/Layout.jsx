import { Outlet } from "react-router-dom";
import Header from './Header';
import Footer from "./Footer";
import PropTypes from 'prop-types';

Layout.propTypes = {
  authenticated: PropTypes.bool,
  setAuthenticated: PropTypes.func
}


export default function Layout({authenticated, setAuthenticated}){
  return(
    <>
      <Header authenticated={authenticated} setAuthenticated={setAuthenticated}/>
      <Outlet />
      <Footer />
    </>
  )
}