import React from 'react';

import fluoride from '../../../assets/images/fluoride.png'
import cavity from '../../../assets/images/cavity.png'
import whitening from '../../../assets/images/whitening.png'
import ServiceCard from './ServiceCard';


const Services = () => {

    const servicesData = [
        {
            id : 1,
            name : 'Fluoride Treatment',
            description : 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            img :fluoride,
        },
        {
            id : 2,
            name : 'Cavity Filling',
            description : 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            img :fluoride,
        },
        {
            id : 3,
            name : 'Teeth Whitening',
            description : 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            img :fluoride,
        },

    ]
    return (
        <div className='mt-32'>
            <div className='text-center'>
                <h3 className="text-xl font-bold text-primary">Our Services</h3>
                <h2 className='text-3xl'>Services we Provide</h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16'>
                {
                    servicesData.map(service => <ServiceCard
                    key={service.id}
                    service={service}
                    ></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;