import React from "react";

const AppointmentOptions = ({ appoint,setTreatment }) => {
	const { name, slots,price } = appoint;
	return (
		<div>
			<div className="card shadow-2xl py-3">
				<div className="card-body items-center">
					<h2 className="card-title text-secondary">{name}</h2>
					<p>{slots.length > 0 ? slots[0] : 'Try another day'}</p>
                    <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} available</p>
					<p>price : ${price}</p>
					<div className="card-actions mt-3">
						
                        <label disabled={slots.length ===0} onClick={()=> setTreatment(appoint)} htmlFor="booking-modal" className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white">Book Appointment</label>

					</div>
				</div>
			</div>
		</div>
	);
};

export default AppointmentOptions;
