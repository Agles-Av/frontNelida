import React, { useEffect } from 'react'
import LandingLayout from './LandingLayout'
import Carrusel from './Carrusel'
import Membresias from './Membresias'
import Clases from './Clases'
import LandingFooter from './LandingFooter'
import AxiosCLient from '../../config/http-gateway/http-client'

const LandingPage = () => {

    return (
        <>
            <LandingLayout />
            <div className='p-5'>
                <div id='Carrusel'>
                    <Carrusel />
                </div>
                <div id='membresias'>
                    <Membresias register={true} />
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