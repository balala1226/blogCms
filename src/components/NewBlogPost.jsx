import {useState} from 'react';
import { BlogPostModel } from '../models/BlogPostModel';
import BlogPostForm from './BlogPostForm';
import { useNavigate } from 'react-router-dom';

import '../style/BlogPostTile.css'

export default function NewBlogPost(){
    const navigate = useNavigate();

    const [blogPost, setBlogPost] = useState(new BlogPostModel());
    
    const handleEditDone = (data) =>{
        console.log('EDIT DONE' + data.confirmed);
        if (data.confirmed){
            navigate('/post/'+data.id);
            return;
        }

        navigate('/');
    };

    return(
        <div className='blogPostView'>
            <h2>New Post</h2>
            <div className='blogContainer'>
                <BlogPostForm blogPost={blogPost} setBlogPost={setBlogPost} formEditDone={handleEditDone}/>
            </div> 
        </div>
    )
}