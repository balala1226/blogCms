import {useState} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function SignUp(){
  const [registrationError, setRegistrationError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(1, 'Username must be at least have a character'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')],'Passwords must match')
  });

  const formOptions = {resolver: yupResolver(validationSchema)};

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const submitForm = async (data, e) => {
   const formData = JSON.stringify(data);
   try {
     const req = await fetch(
       'http://localhost:8080/api/signup',
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
       setErrorMessage(jsonResponse.errors[0].msg);
       setRegistrationError(true);
       return;
     }
     reset();
     window.location.href = '/logIn'
   } catch(err){
     console.log(e);
     console.log(err);
   }
  };

  return(
    <div className='content'>
      <h2>Register</h2>
      <div className='signUpItem'>
        <form className='signUpFormContainer' onSubmit={handleSubmit(submitForm)}>
          <label htmlFor="username">Username:</label>
          <input className={`${errors.username ? 'invalidInputStyle': 'validInputStyle'}`} placeholder="User" {...register("username")}  />
          <div className={`${errors.username ? 'errorContainer' : 'hideDiv'}`}>{errors.username?.message}</div>

          <label  htmlFor="password">Password:</label>
          <input className={`${errors.password ? 'invalidInputStyle': 'validInputStyle'}`} type="password" {...register("password")} />
          <div className={`${errors.password ? 'errorContainer' : 'hideDiv'}`}>{errors.password?.message}</div>

          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input className={`${errors.confirmPassword ? 'invalidInputStyle': 'validInputStyle'}`} type="password" {...register("confirmPassword")} />
          <div className={`${errors.confirmPassword ? 'errorContainer' : 'hideDiv'}`}>{errors.confirmPassword?.message}</div>
          
          <input className='submitButton' type="submit" />
          {registrationError && <span>{errorMessage}</span>}
        </form>
      </div>
    </div>
  )
}