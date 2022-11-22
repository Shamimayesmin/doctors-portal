import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useNavigation } from "react-day-picker";
import { useLoaderData } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";
import CheckoutForm from "./CheckoutForm";
// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
// const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
const stripePromise = loadStripe('pk_test_51M64rCLJkOoDCtuirWeq0rKwipHEg7kvH51gjmzmD2nXnUCtUOBvr2ReyiGwapUKjk3QitfrpenXSA1a60QhDyPE00ysG9ED4j');


const Payment = () => {
	const booking = useLoaderData();
    // const navigation = useNavigation()
    
	// console.log("booking", booking);
	const { treatment, price, appointmentDate, slot } = booking;


    // if(navigation.state === 'loading'){
    //     return <Loading></Loading>
    // }


	return (
		<div>
			<h2 className="text-3xl">Payment for {treatment}</h2>
			<p className="text-xl">
				Please pay <strong>${price}</strong> for your appointment on{slot}
			</p>
			<div className="w-96 my-14">
				<Elements stripe={stripePromise}>
					<CheckoutForm booking={booking}/>
				</Elements>
			</div>
		</div>
	);
};

export default Payment;
