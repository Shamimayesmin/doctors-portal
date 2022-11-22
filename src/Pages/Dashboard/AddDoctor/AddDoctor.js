import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";

const AddDoctor = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const imagehostkey = process.env.REACT_APP_imgbb_key;

    const navigate = useNavigate()

	const { data: specialties, isLoading } = useQuery({
		queryKey: ["specialty"],
		queryFn: async () => {
			const res = await fetch("http://localhost:5000/appointmentSpecialty");
			const data = await res.json();
			return data;
		},
	});

	const handleAddDoctor = (data) => {
		// console.log(data.image[0]);

		const image = data.image[0];
		const formData = new FormData();
		formData.append("image", image);
		const url = `https://api.imgbb.com/1/upload?key=${imagehostkey}`;
		fetch(url, {
			method: "POST",
			body: formData,
		})
			.then((res) => res.json())
			.then((imgData) => {
				if (imgData.success) {
					console.log(imgData.data.url);
					const doctor = {
						name: data.name,
						email: data.email,
						specialty: data.specialty,
						image: imgData.data.url,
					};

					// save doctor information to the database
					fetch("http://localhost:5000/doctors", {
						method: "POST",
						headers: {
							"content-type": "application/json",
							authorization: `bearer ${localStorage.getItem("accessToken")}`,
						},
						body: JSON.stringify(doctor),
					})
						.then((res) => res.json())
						.then((result) => {
							console.log(result);
                            toast.success(`${data.name}is added successfully`)
                            navigate('/dashboard/managedoctors')
						});
				}
			});
	};

	if (isLoading) {
		return <Loading></Loading>;
	}
	return (
		<div className="w-96 mx-auto rounded-lg p-7 shadow-2xl">
			<h2 className="text-3xl">Add A Doctor</h2>
			<form onSubmit={handleSubmit(handleAddDoctor)}>
				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">Name</span>
					</label>

					<input
						{...register("name", { required: "Name is required" })}
						type="text"
						placeholder="Type here"
						className="input input-bordered w-full max-w-xs"
					/>
					{errors.name && (
						<p className="text-red-500">{errors.name?.message}</p>
					)}
				</div>
				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">Email</span>
					</label>

					<input
						{...register("email", { required: "Email is required" })}
						type="email"
						placeholder="Type here"
						className="input input-bordered w-full max-w-xs"
					/>
					{errors.email && (
						<p className="text-red-500">{errors.email?.message}</p>
					)}
				</div>
				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">Specialty</span>
					</label>
					<select
						{...register("specialty")}
						className="select select-bordered w-full max-w-xs"
					>
						{specialties.map((specialty) => (
							<option key={specialty._id} value={specialty.name}>
								{specialty.name}
							</option>
						))}
					</select>

					{/* {error && <p className='text-red-500'>{error}</p>} */}
				</div>

				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">photo</span>
					</label>

					<input
						{...register("image", { required: "photo is required" })}
						type="file"
						placeholder="Type here"
						className="input input-bordered w-full max-w-xs"
					/>
					{errors.img && <p className="text-red-500">{errors.img?.message}</p>}
				</div>

				<input
					className="btn btn-accent w-full mb-4 mt-5"
					value="Add Doctor"
					type="submit"
				/>
			</form>
		</div>
	);
};

/**
 *
 * three places to store image
 * 1. third party image hosting server
 * 2. file system of your server
 * 3. mongodb(database)
 */
export default AddDoctor;
