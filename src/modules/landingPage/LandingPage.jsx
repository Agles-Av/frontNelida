import React from 'react'
import LandingLayout from './LandingLayout'
import Carrusel from './Carrusel'
import Membresias from './Membresias'
import Clases from './Clases'


const LandingPage = () => {
    return (
        <>
            <LandingLayout />
            <div className='p-5'>
                <Carrusel />
                <Membresias />
                <Clases />
            </div>
        </>
    )

}

export default LandingPage