import React from 'react'
import LandingLayout from './ULandingLayout'
import Carrusel from './UCarrusel'
import Membresias from './UMembresias'
import Clases from './UClases'
import LandingFooter from './ULandingFooter'


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