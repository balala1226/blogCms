import {useState} from 'react';
import { BlogPostModel } from '../models/BlogPostModel';
import BlogPostForm from './BlogPostForm';
import { useNavigate } from 'react-router-dom';

import '../style/BlogPost.css'

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
        <div className='content'>
            <div className='blogContainer'>
                <h2>New Post</h2>
                <BlogPostForm blogPost={blogPost} setBlogPost={setBlogPost} formEditDone={handleEditDone}/>
            </div> 
        </div>
    )
}