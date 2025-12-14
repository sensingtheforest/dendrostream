// import globalStylesheet from '../../../myStyles';

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import yuccaN2 from '../../../../../assets/n2-tree.jpg';
import YuccaTree from './YuccaTree';

export default function TreeN2({ children, hideAbout=false }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    const navigate = useNavigate();

    return (
        <div>
            <YuccaTree children={children} yuccaTreeImage={yuccaN2} treeName='Northern 2' treeSize='50cm (~20in)' treeIndoor={true} treeLocation='on a window ledge of a living room in a home in Roslin, Midlothian, Scotland, United Kingdom' treeMapUrl='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17916.039749388794!2d-3.1686595!3d55.85390475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4887bf6548dd78d7%3A0x167a34b253bab7b7!2sRoslin!5e0!3m2!1sen!2suk!4v1753550189578!5m2!1sen!2suk' hideAbout={hideAbout} />
        </div>
    );
}