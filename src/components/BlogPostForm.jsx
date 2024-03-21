import {useState} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import '../style/LogIn.css'
import { BlogPostModel } from '../models/BlogPostModel';

BlogPostForm.propTypes = {
  blogPost: PropTypes.object,
  setBlogPost: PropTypes.func,
  formEditDone: PropTypes.func,
}

export default function BlogPostForm({blogPost, setBlogPost, formEditDone}){
    const [editError, setEditError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Username is required')
            .min(1, 'Username must at least have a character'),
        content: Yup.string()
            .required('Password is required')
            .min(1, 'Content must at least have a character'),
        isPublished: Yup.bool(),
        userId: Yup.string()
    });

    const formOptions = {resolver: yupResolver(validationSchema)};

    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    const createPostApi = 'http://localhost:8080/api/create_blog';
    const updatePostApi = 'http://localhost:8080/api/update_blog/';

    const submitForm = async (data, e) => {
        const formData = JSON.stringify(data);
        const bearerToken = `Bearer ${localStorage.getItem("token")}`

        try {
            var apiToUse = '';
            var method = 'post';
            if (blogPost.id == "")
            {
                apiToUse = createPostApi;
            } else {
                apiToUse = updatePostApi+blogPost.id;
                method = 'put';
            }

            const req = await fetch(
                apiToUse,
                {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": bearerToken,
                    },
                    body: formData,
                }
            );

            const jsonResponse = await req.json();

            if (req.status !== 200){
                setErrorMessage(jsonResponse.errorMessage);
                setEditError(true);
                console.log("post error");
                return;
            }
            
            var newBlogPost = new BlogPostModel();
            newBlogPost.title = jsonResponse.blogPost.title;
            newBlogPost.blogImageUrl = jsonResponse.blogPost.blogImageUrl;
            newBlogPost.content = jsonResponse.blogPost.content;
            newBlogPost.date = new Date(jsonResponse.blogPost.date);
            newBlogPost.user = jsonResponse.blogPost.user;
            newBlogPost.comments = jsonResponse.blogPost.comments;
            newBlogPost.isPublished = jsonResponse.blogPost.isPublished;
            newBlogPost.reactions = jsonResponse.blogPost.reactions;
            newBlogPost.id = jsonResponse.blogPost._id;

            setBlogPost(newBlogPost);

            const data = {
                confirmed: true,
                id: newBlogPost.id
            }

            formEditDone(data);
        }catch(err){
            console.log(e);
            console.log(err);
        }
    };

    const handleEditCancelButton = (event) =>{
        event.preventDefault();

        const data = {
            confirmed: false,
            id: ''
        }

        formEditDone(data);
    };

    return(
        <form className='blogPostFormContainer' onSubmit={handleSubmit(submitForm)}>
            <label htmlFor="title">Title:</label>
            <input name="title" type="text" defaultValue={blogPost.title} {...register("title")}/>
            {/* <div className={`${errors.username ? 'errorContainer' : 'hideDiv'}`}>{errors.username?.message}</div> */}

            <label  htmlFor="content">Content:</label>
            <textarea  name="content" rows="4" cols="50" defaultValue={blogPost.content}  {...register("content")}></textarea>
            {/* <div className={`${errors.password ? 'errorContainer' : 'hideDiv'}`}>{errors.password?.message}</div> */}

            <label  htmlFor="isPublished">Publish:
                <input name="isPublished" type='checkbox' defaultChecked={blogPost.isPublished} {...register("isPublished")}/>
            </label>
            <input name="userId" type="hidden" value={localStorage.getItem("userId")} {...register("userId")}/>
            <button className='formButton' type="submit">Confirm</button>
            <button className='formButton' onClick={handleEditCancelButton}>Cancel</button>
            {editError && <p>{errorMessage}</p>}
        </form>
    )
}