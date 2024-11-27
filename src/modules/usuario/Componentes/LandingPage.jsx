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
                <div id='Carrusel'>
                    <Carrusel />
                </div>
                <div id='membresias'>
                    <Membresias />
                </div>
                <div id='Clases'>
                    <Clases />
                </div>
            </div>
            <div id='footer'>
                 <LandingFooter/>
            </div>
           
        </>
    )

}

export default LandingPage