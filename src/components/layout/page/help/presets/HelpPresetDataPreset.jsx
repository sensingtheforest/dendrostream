// import globalStylesheet from '../../../myStyles';

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HelpPresetData from './HelpPresetData';

export default function HelpPresetDataPreset({ children, introduction='', helpNavigate=()=>{}, averagingPeriod=false }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    const navigate = useNavigate();

    return (
        <div>
            <h2>Help Guide</h2>
            <HelpPresetData introduction={introduction} averagingPeriod={averagingPeriod} helpNavigate={helpNavigate} />
            { children }
        </div>
    );
}