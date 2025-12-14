// import globalStylesheet from '../../../myStyles';

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import TreeN1 from '../../layout/page/about/trees/TreeN1';

export default function TreeN1Modal({ children, modalName='' }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    const navigate = useNavigate();

    return (
        <Modal title='Tree Information' modalName={modalName}>
            <TreeN1 />
            { children }
        </Modal>
    );
}