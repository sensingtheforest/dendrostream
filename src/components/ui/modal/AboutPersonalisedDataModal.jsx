// import globalStylesheet from '../../../myStyles';

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import AboutPersonalisedData from '../../layout/page/help/personalisedData/AboutPersonalisedData';

export default function AboutPersonalisedDataModal({ children, modalName='', referenceTone=true, dualSonification=true, vpd=true, treeMeanGrowth=true, aboutPage=false }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    const navigate = useNavigate();

    return (
        <Modal title='Data Information' modalName={modalName}>
            <AboutPersonalisedData referenceTone={referenceTone} dualSonification={dualSonification} vpd={vpd} treeMeanGrowth={treeMeanGrowth} aboutPage={aboutPage} />
            { children }
        </Modal>
    );
}