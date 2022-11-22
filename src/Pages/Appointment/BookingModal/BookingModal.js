import React, { useContext } from "react";
import { format } from "date-fns";
import { AuthContext } from "../../../context/AuthProvider";
import toast from "react-hot-toast";

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
	const { name: treatmentName, slots, price } = treatment; // treatment is appointment options
	const date = format(selectedDate, "PP");

	const { user } = useContext(AuthContext);

	const handleBookin = (event) => {
		event.preventDefault();

		const form = event.target;
		const name = form.name.value;
		const slot = form.slot.value;
		const email = form.email.value;
		const phone = form.phone.value;

		console.log(date, name, slot, email, phone);
		const booking = {
			appointmentDate: date,
			treatment: treatmentName,
			patient: name,
			slot,
			email,
			phone,
			price,
		};

		// TODO : send data to the server
		// and once data is saved then close the modal
		// and display toast

		fetch("https://doctors-portal-server-pearl.vercel.app/bookings", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(booking),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.acknowledged) {
					setTreatment(null);
					toast.success("booking confirmed");
					refetch();
				} else {
					toast.error(data.message);
				}
			});
		// console.log(booking);
		// setTreatment(null)
	};
	return (
		<>
			<input type="checkbox" id="booking-modal" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box relative">
					<label
						htmlFor="booking-modal"
						className="btn btn-sm btn-circle absolute right-2 top-2"
					>
						✕
					</label>
					<h3 className="text-lg font-bold">{treatmentName}</h3>

					<form
						onSubmit={handleBookin}
						className="grid grid-cols-1 gap-3 mt-10"
					>
						<input
							type="text"
							value={date}
							className="input input-bordered w-full"
							disabled
						/>
						<select name="slot" className="select select-bordered w-full">
							{slots.map((slot, i) => (
								<option value={slot} key={i}>
									{slot}
								</option>
							))}
						</select>
						<input
							name="name"
							type="text"
							placeholder="Your name"
							defaultValue={user?.displayName}
							disabled
							className="input input-bordered w-full"
						/>
						<input
							name="email"
							type="email"
							placeholder="Email address"
							defaultValue={user?.email}
							readOnly
							className="input input-bordered w-full"
						/>
						<input
							name="phone"
							type="number"
							placeholder="Phone number"
							className="input input-bordered w-full"
						/>
						<br />
						<input
							className="w-full max-w-xs btn btn-accent"
							type="submit"
							value="submit"
						/>
					</form>
				</div>
			</div>
		</>
	);
};

export default BookingModal;
