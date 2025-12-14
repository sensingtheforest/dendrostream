// import globalStylesheet from '../../../myStyles';

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import AboutPrimaryData from '../../layout/page/help/presets/primaryData/AboutPrimaryData';

export default function AboutPrimaryDataModal({ children, referenceTone=true, dualSonification=false, variability=false, ambience=false, modalName='', displacementMapping='', soilMoistureMapping='', temperatureMapping='', humidityMapping='' }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    const navigate = useNavigate();

    return (
        <Modal title='Data Information' modalName={modalName}>
            <AboutPrimaryData referenceTone={referenceTone} dualSonification={dualSonification} variability={variability} ambience={ambience} displacementMapping={displacementMapping} soilMoistureMapping={soilMoistureMapping} temperatureMapping={temperatureMapping} humidityMapping={humidityMapping} />
            { children }
        </Modal>
    );
}