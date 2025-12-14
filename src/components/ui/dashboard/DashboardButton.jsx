// import globalStylesheet from '../../../myStyles';

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function DashboardButton({ children, image='', title='', subtitle='', link='' }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    const navigate = useNavigate();

    return (
        <div className='d-flex justify-content-center align-items-center flex-column dashboard-button' style={{ padding: '2rem', cursor: 'pointer', border: '1px solid #ccc', backgroundColor: '#F0FAF4', height: '20rem' }} onClick={() => navigate(`/${link}`)}>
            { typeof image === 'string' ? ( <img src={image} alt={title} /> ) :  ( image ) }
            <h2 style={{ color: '#1B1B1B'}}>{title}</h2>
            <h4 style={{ color: '#065F46'}}>{subtitle}</h4>
        </div>
    );
}