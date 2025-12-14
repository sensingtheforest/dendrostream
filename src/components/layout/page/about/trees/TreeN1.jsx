// import globalStylesheet from '../../../myStyles';

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import yuccaN1 from '../../../../../assets/n1-tree.jpg';
import YuccaTree from './YuccaTree';

export default function TreeN1({ children, hideAbout=false }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    const navigate = useNavigate();

    return (
        <div>
            <YuccaTree children={children} yuccaTreeImage={yuccaN1} treeName='Northern 1' treeSize='50cm (~20in)' treeIndoor={true} treeLocation='on a window ledge of a living room in a home in Ealing, West London, United Kingdom' treeMapUrl='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19866.08816811445!2d-0.309092700000014!3d51.50842710000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760df52eecc6d1%3A0xe55b4291b14ac557!2sEaling%2C%20London!5e0!3m2!1sen!2suk!4v1753489942058!5m2!1sen!2suk' hideAbout={hideAbout} />
        </div>
    );
}