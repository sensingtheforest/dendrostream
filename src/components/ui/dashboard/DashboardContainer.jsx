// import globalStylesheet from '../../../myStyles';

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../assets/stf-logo.png';

export default function DashboardContainer({ children }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    // const navigate = useNavigate();

    return (
        <div className='d-flex justify-content-center flex-column responsive-grid' style={{ }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '5%' }}>
            { children }
        </div>
        </div>
    );
}