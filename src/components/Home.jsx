import '../style/Home.css'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import BlogPostTile from './BlogPostTile';

Home.propTypes = {
  authenticated: PropTypes.bool
}

export default function Home({ authenticated }){
  const [allPosts, setAllPosts] = useState([]);
  
  useEffect(() => {
    fetchAllBlogPostData();
  },[]);

  const fetchAllBlogPostData = async() =>{
    const req = await fetch('https://pseudo-blog.adaptable.app/api/all_blogs');
    
    if(!req){
      return;
    }
    const data = await req.json();

    if (req.status !== 200){
      console.log("fetch error");
      return;
    }

    var newAllPost = data.blogPosts;

    setAllPosts(newAllPost);
  }

  return(
    <>
      <div className='content'>
        { authenticated &&
          <Link to="/createPost" className='createPostLink'>
            <div className='makeNewPostContainer'><h2>Make New Post</h2></div>
          </Link>
        }
        <h1>All Posts</h1>
        <div className='allPostContainer'>
          {allPosts.map((currentPost, index) => (
            <BlogPostTile  key={index} blogPost={currentPost}></BlogPostTile>
          ))}
        </div>
      </div>
    </>
  )
}