import React from 'react';


import quote from '../../../assets/icons/quote.svg'
import people1 from '../../../assets/images/people1.png'
import people2 from '../../../assets/images/people2.png'
import people3 from '../../../assets/images/people3.png'
import Review from './Review';

const Testimonial = () => {

    const reviews = [
        {
            _id : 1,
            img : people1, 
            name : 'Winson Herry',
            reviews : 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            location : 'California'
        },
        {
            _id : 1,
            img : people2, 
            name : 'Winson Herry',
            reviews : 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            location : 'California'
        },
        {
            _id : 1,
            img : people3, 
            name : 'Winson Herry',
            reviews : 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            location : 'California'
        }
    ]
    return (
        <section className='my-20'>
            <div className='flex justify-between'>

                <div>
                    <h3 className='text-lg text-primary font-bold'>Testimonial</h3>
                    <h2 className='text-3xl'>What Our Patients Says</h2>
                </div>
                <figure>
                    <img src={quote} alt=""  className='w-24 lg:w-48'/>
                </figure>
            </div>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {
                    reviews.map(review =><Review
                    key={review._id}
                    review={review}
                    ></Review>)
                }
            </div>
        </section>
    );
};

export default Testimonial;