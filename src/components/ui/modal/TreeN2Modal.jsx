// import globalStylesheet from '../../../myStyles';

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import TreeN2 from '../../layout/page/about/trees/TreeN2';

export default function TreeN2Modal({ children, modalName='' }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    const navigate = useNavigate();

    return (
        <Modal title='Tree Information' modalName={modalName}>
            <TreeN2 />
            { children }
        </Modal>
    );
}