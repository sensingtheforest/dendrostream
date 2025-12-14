// import globalStylesheet from '../../../myStyles';

import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Modal from './Modal';
import HelpPresetData from '../../layout/page/help/presets/HelpPresetData';

export default function PresetHelpModal({ children, modalName='', introduction='', helpNavigate=()=>{}, averagingPeriod=false }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    const navigate = useNavigate();

    return (
        <Modal title='Help Guide' modalName={modalName}>
            <HelpPresetData introduction={introduction} helpNavigate={helpNavigate} averagingPeriod={averagingPeriod} />
            { children }
        </Modal>
    );
}
