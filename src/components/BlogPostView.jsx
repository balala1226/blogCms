import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../style/BlogPostTile.css'

BlogPostView.propTypes = {
  post: PropTypes.object
}

export default function BlogPostView(){
  return(
    <div className='blogPostTile'>
      <Link to={"/post/"+this.props.post.id} className='blogPostTileLink'>
        <div className='imageTileContainer'>
          <img className='itemImageTile' src={this.props.post.image}></img>
        </div>
        <div className='textTileContainer'>
          <div className='itemNameTileContainer'>
            <p className='itemNameTile'>{this.props.post.title}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}