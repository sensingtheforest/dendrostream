// import globalStylesheet from '../../../myStyles';

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AboutPrimaryDataPreset from './AboutPrimaryDataPreset';
import HelpPresetDataPreset from '../HelpPresetDataPreset';

export default function PrimaryDataPreset({ children, referenceTone=false, dualSonification=false, variability=false, displacementMapping='', soilMoistureMapping='', temperatureMapping='', humidityMapping='', introduction='', helpNavigate=()=>{}, averagingPeriod=false }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    const navigate = useNavigate();

    return (
        <div>
            <AboutPrimaryDataPreset referenceTone={referenceTone} dualSonification={dualSonification} variability={variability} displacementMapping={displacementMapping} soilMoistureMapping={soilMoistureMapping} temperatureMapping={temperatureMapping} humidityMapping={humidityMapping} />
            <div style={{ height: '2rem' }}></div>
            <HelpPresetDataPreset introduction={introduction} helpNavigate={helpNavigate} averagingPeriod={averagingPeriod} />
            { children }
        </div>
    );
}