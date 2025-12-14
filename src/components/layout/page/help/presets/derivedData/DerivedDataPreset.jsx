// import globalStylesheet from '../../../myStyles';

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AboutDerivedDataPreset from './AboutDerivedDataPreset';
import HelpPresetDataPreset from '../HelpPresetDataPreset';

export default function DerivedDataPreset({ children, referenceTone=true, dualSonification=false, variability=false, ambience=false, displacementMapping='', soilMoistureMapping='', temperatureMapping='', humidityMapping='', vpd=false, vpdMapping='', treeMeanGrowth=false, treeMeanGrowthMapping='', introduction='', helpNavigate=()=>{}, averagingPeriod=false }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    const navigate = useNavigate();

    return (
        <div>
            <AboutDerivedDataPreset referenceTone={referenceTone} dualSonification={dualSonification} variability={variability} ambience={ambience} displacementMapping={displacementMapping} soilMoistureMapping={soilMoistureMapping} temperatureMapping={temperatureMapping} humidityMapping={humidityMapping} vpd={vpd} vpdMapping={vpdMapping} treeMeanGrowth={treeMeanGrowth} treeMeanGrowthMapping={treeMeanGrowthMapping} />
            <div style={{ height: '2rem' }}></div>
            <HelpPresetDataPreset introduction={introduction} helpNavigate={helpNavigate} averagingPeriod={averagingPeriod} />
            { children }
        </div>
    );
}