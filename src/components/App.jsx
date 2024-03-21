import { BrowserRouter,  Route,  Routes } from "react-router-dom";

import '../style/App.css';
import Layout from "./Layout";
import Home from './Home';
import LogIn from './LogIn';
import SignUp from './SignUp';
import BlogPostView from './BlogPostView';
import { useState } from "react";
import NewBlogPost from "./NewBlogPost";
import ErrorPage from "./ErrorPage";

export default function App(){
  const [authenticated, setAuthenticated] = useState(() =>{
    const isAuthorized = localStorage.getItem('userAuthorized');
    
    if (!isAuthorized) {
      return false;
    }

    const tokenDate = new Date(localStorage.getItem('tokenDate'));
    tokenDate.setDate(tokenDate.getDate() + 1);
    const dateNow = new Date();
    
    if (dateNow > tokenDate){
      return false;
    }

    return true;
  });

  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout authenticated={authenticated} setAuthenticated={setAuthenticated}/>}>
            <Route path="/" element={<Home authenticated={authenticated}/>} />
            <Route path="/logIn" element={<LogIn setAuthenticated={setAuthenticated}/>} />
            <Route path="/signUp" element={<SignUp/>} />
            <Route path="/post/:id" element={<BlogPostView authenticated={authenticated}/>} />
            <Route path="/createPost" element={<NewBlogPost/>} />
            <Route path="*" element={<ErrorPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}