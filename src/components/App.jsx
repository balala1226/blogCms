import { BrowserRouter,  Route,  Routes } from "react-router-dom";

import '../style/App.css';
import Layout from "./Layout";
import Home from './Home';
import LogIn from './LogIn';
import SignUp from './SignUp';
import BlogPostView from './BlogPostView';
import { useState } from "react";

export default function App(){
  const [authenticated, setAuthenticated] = useState(false);

  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout authenticated={authenticated} setAuthenticated={setAuthenticated}/>}>
            <Route path="/" element={<Home/>} />
            <Route path="/logIn" element={<LogIn setAuthenticated={setAuthenticated}/>} />
            <Route path="/signUp" element={<SignUp/>} />
            <Route path="/post/:id" element={<BlogPostView/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}