import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";

const Myappointment = () => {
	const { user } = useContext(AuthContext);

	const url = `https://doctors-portal-server-pearl.vercel.app/bookings?email=${user?.email}`;

	const { data: bookings = [] } = useQuery({
		queryKey: ["bookings", user?.email],
		queryFn: async () => {
			const res = await fetch(url, {
				headers: {
					authorization: `bearer ${localStorage.getItem("accessToken")}`,
				},
			});
			const data = await res.json();
			return data;
		},
	});
	return (
		<div>
			<h2 className="text-3xl mb-4">My Appointment</h2>
			<div className="overflow-x-auto">
				<table className="table w-full">
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Treatment</th>
							<th>Date</th>
							<th>Time</th>
							<th>Payment</th>
						</tr>
					</thead>
					<tbody>
						{bookings &&
							bookings?.map((booking, i) => (
								<tr key={booking._id} className="hover">
									<th>{i + 1}</th>
									<td>{booking.patient}</td>
									<td>{booking.treatment}</td>
									<td>{booking.appointmentDate}</td>
									<td>{booking.slot}</td>
									<td>
										{booking.price && !booking.paid && (
											<Link to={`/dashboard/payment/${booking._id}`}>
												<button className="btn btn-primary btn-sm">pay</button>
											</Link>
										)}
										{booking.price && booking.paid && (
											<button className=" text-green-400 btn-sm">paid</button>
										)}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Myappointment;
