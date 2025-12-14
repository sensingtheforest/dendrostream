// import globalStylesheet from '../../../myStyles';

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import TreeAnon from '../../layout/page/about/trees/TreeAnon';

export default function TreeAnonModal({ children, modalName='' }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    const navigate = useNavigate();

    return (
        <Modal title='Tree Information' modalName={modalName}>
            <TreeAnon />
            { children }
        </Modal>
    );
}