import React from "react";

const Review = ({ review }) => {
	const { name, img, reviews, location } = review;
	return (
		<div className="card shadow-xl">
			<div className="card-body">
				<p>{reviews}</p>
				<div className="flex items-center">
					<div className="avatar mt-6">
						<div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mr-6">
							<img src={img} alt='' />
						</div>
                        <div>
                            <h5 className="text-lg">{name}</h5>
                            <p>{location}</p>
                        </div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Review;
