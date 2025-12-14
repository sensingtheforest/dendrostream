// import globalStylesheet from '../../../myStyles';

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AboutPrimaryData from './AboutPrimaryData';

export default function AboutPrimaryDataPreset({ children, referenceTone=false, dualSonification=false, variability=false, displacementMapping='', soilMoistureMapping='', temperatureMapping='', humidityMapping='' }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    const navigate = useNavigate();

    return (
        <div>
            <h2>Data Information</h2>
            <AboutPrimaryData referenceTone={referenceTone} dualSonification={dualSonification} variability={variability} displacementMapping={displacementMapping} soilMoistureMapping={soilMoistureMapping} temperatureMapping={temperatureMapping} humidityMapping={humidityMapping} />
            { children }
        </div>
    );
}