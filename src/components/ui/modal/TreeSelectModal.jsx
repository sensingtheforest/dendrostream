// import globalStylesheet from '../../../myStyles';

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from './Modal';

export default function TreeSelectModal({ children, modalName='' }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    const navigate = useNavigate();

    return (
        <Modal title='Tree Selection' modalName={modalName}>
            <div style={{ height: '100%' }}>
                <h4 style={{ textAlign: 'left' }}>Select a Tree</h4>
                <p style={{ textAlign: 'left' }}>Select a tree to discover more about it.</p>
                { children }
            </div>
        </Modal>
    );
}