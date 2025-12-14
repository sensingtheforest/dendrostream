// import globalStylesheet from '../../../myStyles';

import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Modal from './Modal';
import HelpPresetData from '../../layout/page/help/presets/HelpPresetData';
import PersonalisedDataHelp from '../../layout/page/help/personalisedData/PersonalisedDataHelp';

export default function PersonalisedDataHelpModal({ children, modalName='', helpNavigate=()=>{} }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    const navigate = useNavigate();

    return (
        <Modal title='Help Guide' modalName={modalName}>
            <PersonalisedDataHelp helpNavigate={helpNavigate}/>
            { children }
        </Modal>
    );
}
