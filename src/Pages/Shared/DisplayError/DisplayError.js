import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const DisplayError = () => {
    const error = useRouteError()
    return (
        <div>
            <p className='text-4xl text-red-600'>Something went wrong</p>
            <p className='text-red-300'>
                {error.statusText || error.message }
            </p>
            <h3 className='text-3xl bg-slate-500'><Link to='/'><button>Back to home</button></Link></h3>
        </div>
    )
};

export default DisplayError;