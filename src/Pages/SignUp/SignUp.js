import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useToken from '../../hooks/useToken';

const SignUp = () => {
    const { register,formState: { errors }, handleSubmit } = useForm();

	const {createUser,updateUser,googleSignIn} = useContext(AuthContext)

	const [error, setError] = useState('')
	const navigate = useNavigate()
	// const location = useLoaderData()
// get jwt token hook :
	const [createUserEmail, setCreateUserEmail] = useState('')
	const [token] = useToken(createUserEmail)

	if(token){
		navigate('/')
	}

    const handleSignUp = (data) =>{
        console.log(data);
		setError('')

		createUser(data.email, data.password)
		.then(result =>{
			const user = result.user
			console.log(user);

			toast.success('user created successfully')
			const userInfo = {
				displayName : data.name
			}
			updateUser(userInfo)
			.then(() =>{
				saveUser(data.name , data.email)
				
			})
			.catch(err => console.log(err))
		})
		.catch(error=>{
			console.log(error)
			setError(error.message)
		})
    }


	const handleGoogleSignIn =()=>{
		googleSignIn()
		.then(result =>{
			const user = result.user;
            console.log(user)
		})
		.catch(err => console.error(err))
	}

	// creaate and save user

	const saveUser = (name, email) =>{
		const user = {name, email}
		fetch('http://localhost:5000/users' , {
			method : 'POST',
			headers : {
				'content-type' : 'application/json'
			},
			body : JSON.stringify(user)
		})
		.then(res => res.json())
		.then(data => {
			// console.log('save user',data);
			setCreateUserEmail(email)
		})
	}


	
    return (
        <div className="h-[800px] flex justify-center items-center">
			<div className="w-96 rounded-lg p-7 shadow-2xl">
				<h2 className="text-2xl text-center">Sign Up</h2>
				<form onSubmit={handleSubmit(handleSignUp)}>
					<div className="form-control w-full max-w-xs">
						<label className="label">
							<span className="label-text">Name</span>
						</label>

						<input
							{...register("name",{ required: "Name is required" })}
							type="text"
							placeholder="Type here"
							className="input input-bordered w-full max-w-xs"
						/>
                        {errors.name && <p className="text-red-500">{errors.name?.message}</p>}
                        
					</div>
					<div className="form-control w-full max-w-xs">
						<label className="label">
							<span className="label-text">Email</span>
						</label>

						<input
							{...register("email" ,{ required: "Email is required" })}
							type="email"
							placeholder="Type here"
							className="input input-bordered w-full max-w-xs"
						/>
                         {errors.email && <p className="text-red-500">{errors.email?.message}</p>}
                        
					</div>
					<div className="form-control w-full max-w-xs">
						<label className="label">
							<span className="label-text">Password</span>
						</label>

						<input
							{...register("password" ,
                            { required: "password is required" ,
                            minLength :{value : 6, message : 'password should be 6 characters logn'},
                             
                             pattern: { value: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])/,message : 'password must be strong'}
                            }
                            )}
							type="password"
							placeholder="Type here"
							className="input input-bordered w-full max-w-xs mb-4"
						/>
						
                        {errors.password && <p className="text-red-500">{errors.password?.message}</p>}

                        <input className='btn btn-accent w-full mb-4' value="Sign Up" type="submit" />
						
						{error && <p className='text-red-500'>{error}</p>}
					</div>	
				</form>
                <small><p>Already have an account ?<Link className="link link-hover text-secondary" to='/login'>Please Login</Link></p></small>
                <div className="divider">OR</div>
                <button onClick={handleGoogleSignIn} className="btn btn-outline mb-3 w-full">CONTINUE WITH GOOGLE</button>
			</div>
		</div>
    );
};

export default SignUp;