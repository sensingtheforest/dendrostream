// import globalStylesheet from '../../../myStyles';

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import yuccaN2 from '../../../../../assets/n2-tree.jpg';
import YuccaTree from './YuccaTree';

export default function TreeAnon({ children, hideAbout=false }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    const navigate = useNavigate();

    return (
        <div>
            <YuccaTree children={children} yuccaTreeImage={yuccaN2} treeName='[Redacted for Privacy due to Ethical Approval]' treeSize='50cm (~20in)' treeIndoor={true} treeLocation='[Redacted for Privacy due to Ethical Approval]' treeMapUrl='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158858.58518354254!2d-0.2664024715718663!3d51.52852620471622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon!5e0!3m2!1sen!2suk!4v1754437324668!5m2!1sen!2suk' hideAbout={hideAbout} />
        </div>
    );
}