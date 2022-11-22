import React from "react";

import img from '../../../assets/images/appointment.png'

const Contact = () => {
	return (
		<section>
			<div className="hero bg-base-200" style={{
          backgroundImage :`url(${img})`,
          backgroundSize : 'cover'}}>
				<div className="hero-content flex-col py-16">
					<div className="text-center">
						<h1 className="text-xl font-bold text-primary">Contact Us</h1>
						<p className="py-4 text-3xl text-white">
                        Stay connected with us
						</p>
					</div>
					<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
						<div className="card-body">
							<div className="form-control">
								
								<input
									type="text"
									placeholder="email address"
									className="input input-bordered"
								/>
							</div>
							<div className="form-control">
								
								<input
									type="text"
									placeholder="subject"
									className="input input-bordered"
								/>
								
							</div>
                            <div className="form-control">
								
								<textarea className="textarea textarea-bordered" placeholder="Your Message"></textarea>
							</div>
							<div className="form-control mt-6">
								<button className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white">Submit</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact;
