import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import AppointmentOptions from "./AppointmentOptions";
import BookingModal from "../BookingModal/BookingModal";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";

const AvailableAppointments = ({ selectedDate }) => {
	// const [appointments , setAppointments] = useState()

	const [treatment, setTreatment] = useState(null);
	const date = format(selectedDate, "PP");

	// const {data :appointments =[]} = useQuery({
	//     queryKey : ['appointmentOptions'],
	//     queryFn : () =>fetch('https://doctors-portal-server-pearl.vercel.app/appointmentOptions?date=${date}')
	//     .then(res => res.json())
	// })

	const {
		data: appointments = [],
		refetch,
		isLoading,
	} = useQuery({
		queryKey: ["appointmentOptions", date],
		queryFn: async () => {
			const res = await fetch(
				`https://doctors-portal-server-pearl.vercel.app/v2/appointmentOptions?date=${date}`
			);
			const data = await res.json();
			return data;
		},
	});

	if (isLoading) {
		return <Loading></Loading>;
	}
	// useEffect(()=>{
	//     fetch('https://doctors-portal-server-pearl.vercel.app/appointmentOptions')
	//     .then(res => res.json())
	//     .then(data => setAppointments(data))
	// },[])

	return (
		<section className="mt-16">
			<p className="text-center text-secondary font-bold">
				Available Appointments on {format(selectedDate, "PP")}
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
				{appointments?.map((appoint) => (
					<AppointmentOptions
						key={appoint._id}
						appoint={appoint}
						setTreatment={setTreatment}
					></AppointmentOptions>
				))}
			</div>
			{treatment && (
				<BookingModal
					selectedDate={selectedDate}
					treatment={treatment}
					setTreatment={setTreatment}
					refetch={refetch}
				></BookingModal>
			)}
		</section>
	);
};

export default AvailableAppointments;
