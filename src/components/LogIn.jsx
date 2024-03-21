import {useState} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import '../style/LogIn.css'

LogIn.propTypes = {
  authenticated: PropTypes.bool,
  setAuthenticated: PropTypes.func
}

export default function LogIn({setAuthenticated}){
  const navigate = useNavigate();

  const [logInError, setLogInError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(1, 'Username must be at least have a character'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
  });

  const formOptions = {resolver: yupResolver(validationSchema)};

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const submitForm = async (data, e) => {
   const formData = JSON.stringify(data);
   try {
     const req = await fetch(
       'http://localhost:8080/api/login',
       {
         method: 'post',
         body: formData,
         headers: {
           'Content-Type': 'application/json'
         },
       }
     );
     const jsonResponse = await req.json();

     if (req.status !== 200){
       setErrorMessage(jsonResponse.errorMessage);
       setLogInError(true);
       return;
     }
     
     localStorage.setItem('token', jsonResponse.token);
     localStorage.setItem('userAuthorized', true);
     localStorage.setItem('userName', jsonResponse.user.username);
     localStorage.setItem('userId', jsonResponse.user._id);
     localStorage.setItem('tokenDate', new Date())
     
     setAuthenticated(true);

     navigate('/');
    }catch(err){
     console.log(e);
     console.log(err);
   }
  };

  return(
    <div className='content'>
      <h2>Log in</h2>
      <div className='logInItem'>
        <form className='logInFormContainer' onSubmit={handleSubmit(submitForm)}>
          <label htmlFor="username">Username:</label>
          <input className={`${errors.username ? 'invalidInputStyle': 'validInputStyle'}`} placeholder="User" {...register("username")}  />
          <div className={`${errors.username ? 'errorContainer' : 'hideDiv'}`}>{errors.username?.message}</div>

          <label  htmlFor="password">Password:</label>
          <input className={`${errors.password ? 'invalidInputStyle': 'validInputStyle'}`} type="password" {...register("password")} />
          <div className={`${errors.password ? 'errorContainer' : 'hideDiv'}`}>{errors.password?.message}</div>

          <input className='submitButton' type="submit" />
          {logInError && <p>{errorMessage}</p>}
        </form>
      </div>
    </div>
  )
}