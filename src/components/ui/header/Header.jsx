// import globalStylesheet from '../../../myStyles';

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../assets/stf-logo.png';

export default function Header({ children, backLink='' }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    const navigate = useNavigate();

    return (
        <div className='d-flex flex-row justify-content-between align-items-center w-100 responsive-header responsive-reverse responsive-unsticky' style={{ height: '100px', position: 'sticky', top: '0', background: 'white', zIndex: '1000' }}>
            <div className='d-flex flex-column justify-content-center align-items-center m-4' style={{ position: 'absolute', left: '0', cursor: 'pointer' }} onClick={() => window.history.length > 1 ? navigate(-1) : navigate(`/${backLink}`)}>
                <i className="bi bi-arrow-left-circle" style={{ fontSize: '2em' }}></i>
                <h4>Back</h4>
            </div>
            <div className='d-flex justify-content-center align-items-center mx-auto responsive-header' style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                <img src={logo} alt='Sensing the Forest Logo' className='logo-img' style={{ width: 'auto', height: '75px', marginRight: '50px' }} />
                <i className="bi bi-soundwave" style={{ fontSize: '5rem', color: 'green' }}></i>
            </div>
        </div>
    );
}