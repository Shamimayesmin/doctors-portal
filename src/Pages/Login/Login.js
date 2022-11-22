import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useToken from "../../hooks/useToken";

const Login = () => {
	const { register,formState: { errors }, handleSubmit } = useForm();
	
	const {singIn,googleSignIn,resetPassword} = useContext(AuthContext)
	const [loginError, setLoginError] = useState('')

	const location = useLocation()
	const navigate = useNavigate()

	const from = location.state?.from?.pathname || '/';


	// jwt token get :
	const [logingUserEmail, setLogingUserEmail] = useState('')

	const [token] = useToken(logingUserEmail)

	if(token){
		navigate(from, {replace : true})
	}

	// handle login button
    const handleLogin = (data) =>{
        console.log(data);
		setLoginError('')
		singIn(data.email , data.password)
		.then(result =>{
			const user = result.user;
			console.log(user);

			setLogingUserEmail(data.email)

			
		})
		.catch(error => {
			console.log(error.message)
			setLoginError(error.message)
		})
    }

	// forget pass 

	const handleResetPass = (data) =>{
		resetPassword(data.email)
		.then(result =>{
			const user =  result.user;
			console.log(user);

		})
		.catch(error => console.log(error))
	}

	const handleGoogleSignIn =()=>{
		googleSignIn()
		.then(result =>{
			const user = result.user;
            console.log(user)
			navigate(from, {replace : true})
		})
		.catch(err => console.error(err))
	}


	return (
		<div className="h-[800px] flex justify-center items-center">
			<div className="w-96 rounded-lg p-7 shadow-2xl">
				<h2 className="text-2xl text-center">Login</h2>
				<form onSubmit={handleSubmit(handleLogin)}>
					<div className="form-control w-full max-w-xs">
						<label className="label">
							<span className="label-text">Email</span>
						</label>

						<input
							{...register("email",{required : "Email Address is required"})}
							type="text"
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
							{...register("password",{required : "Password is required",minLength: { value: 6, message: "password must be 6 characters or long" }})}
							type="password"
							placeholder="Type here"
							className="input input-bordered w-full max-w-xs"
						/>
						<label className="label">
							<Link onClick={handleResetPass} href="/" className="label-text-alt link link-hover">
								Forgot password?
							</Link>
						</label>
                        {errors.password && <p className="text-red-500">{errors.password?.message}</p>}

                        <input className='btn btn-accent w-full mb-4' value="Login" type="submit" />
						

					</div>	

					<div>
						{loginError && <p className="text-red-500">{loginError}</p>}
					</div>
				</form>
                <small><p>New to doctors portal? <Link className="link link-hover text-secondary" to='/signup'>Create new account</Link></p></small>
                <div className="divider">OR</div>
                <button onClick={handleGoogleSignIn} className="btn btn-outline mb-3 w-full">CONTINUE WITH GOOGLE</button>
			</div>
		</div>
	);
};

export default Login;
