// import globalStylesheet from '../../../myStyles';

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../assets/stf-logo.png';

export default function Logo({ children }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    const navigate = useNavigate();

    return (
        <div className='d-flex justify-content-center align-items-center' style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            <img src={logo} alt='Sensing the Forest Logo' style={{ width: 'auto', height: '75px', marginRight: '50px' }} />
            <i className="bi bi-soundwave" style={{ fontSize: '5rem', color: 'green' }}></i>
        </div>
    );
}