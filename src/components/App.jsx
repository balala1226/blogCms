import { Component } from "react";
import { BrowserRouter,  Route,  Routes } from "react-router-dom";

import '../style/App.css';
import Layout from "./Layout";
import Home from './Home';
import LogIn from './LogIn';

class App extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout/>}>
              <Route path="/" element={<Home/>} />
              <Route path="/logIn" element={<LogIn/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default App
