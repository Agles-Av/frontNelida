import React from 'react'
import LandingLayout from './LandingLayout'
import Carrusel from './Carrusel'
import Membresias from './Membresias'
import Clases from './Clases'
import LandingFooter from './LandingFooter'


const LandingPage = () => {
    return (
        <>
            <LandingLayout />
            <div className='p-5'>
                <Carrusel />
                <Membresias />
                <Clases />
            </div>
            <LandingFooter/>
        </>
    )

}

export default LandingPage