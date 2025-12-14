// import globalStylesheet from '../../../myStyles';

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AboutDerivedData from './AboutDerivedData';

export default function AboutDerivedDataPreset({ children, referenceTone=true, dualSonification=false, variability=false, ambience=false, displacementMapping='', soilMoistureMapping='', temperatureMapping='', humidityMapping='', vpd=false, vpdMapping='', treeMeanGrowth=false, treeMeanGrowthMapping='' }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    const navigate = useNavigate();

    return (
        <div>
            <h2>Data Information</h2>
            <AboutDerivedData referenceTone={referenceTone} dualSonification={dualSonification} variability={variability} ambience={ambience} displacementMapping={displacementMapping} soilMoistureMapping={soilMoistureMapping} temperatureMapping={temperatureMapping} humidityMapping={humidityMapping} vpd={vpd} vpdMapping={vpdMapping} treeMeanGrowth={treeMeanGrowth} treeMeanGrowthMapping={treeMeanGrowthMapping} />
            { children }
        </div>
    );
}