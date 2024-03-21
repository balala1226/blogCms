import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../style/BlogPostTile.css'

BlogPostTile.propTypes = {
  blogPost: PropTypes.object
}

export default function BlogPostTile({blogPost}){
  return(
    <div className='blogPostTile'>
      <Link to={"/post/"+blogPost._id} className='blogPostTileLink'>
        <div className='imageTileContainer'>
          <img className='itemImageTile' src={blogPost.image}></img>
        </div>
        <div className='textTileContainer'>
          <div className='itemNameTileContainer'>
            <p className='itemNameTile'>{blogPost.title}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}