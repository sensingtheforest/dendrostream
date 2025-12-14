// import globalStylesheet from '../../../myStyles';

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import AboutDerivedData from '../../layout/page/help/presets/derivedData/AboutDerivedData';

export default function AboutDerivedDataModal({ children, referenceTone=true, dualSonification=false, variability=false, ambience=false, modalName='', displacementMapping='', soilMoistureMapping='', temperatureMapping='', humidityMapping='', vpd=false, vpdMapping='', treeMeanGrowth=false, treeMeanGrowthMapping='' }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    const navigate = useNavigate();

    return (
        <Modal title='Data Information' modalName={modalName}>
            <AboutDerivedData referenceTone={referenceTone} variability={variability} ambience={ambience} dualSonification={dualSonification} displacementMapping={displacementMapping} soilMoistureMapping={soilMoistureMapping} temperatureMapping={temperatureMapping} humidityMapping={humidityMapping} vpd={vpd} vpdMapping={vpdMapping} treeMeanGrowth={treeMeanGrowth} treeMeanGrowthMapping={treeMeanGrowthMapping} />
            { children }
        </Modal>
    );
}