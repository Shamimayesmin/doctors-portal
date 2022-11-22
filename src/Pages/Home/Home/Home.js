import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import Banner from '../Banner/Banner';
import Contact from '../Contacts/Contact';
import DantalCares from '../DantalCares/DantalCares';
import InfoCards from '../InfoCards/InfoCards';
import MakeAppointment from '../MakeAppointment/MakeAppointment';
import Services from '../Services/Services';
import Testimonial from '../Testimonial/Testimonial';

const Home = () => {
    return (
        <div className='mx-5'>
            <Banner></Banner>
            <InfoCards></InfoCards>
            <Services></Services>
            <DantalCares></DantalCares>
            <MakeAppointment></MakeAppointment>
            <Testimonial></Testimonial>
            <Contact></Contact>
        </div>
    );
};

export default Home;