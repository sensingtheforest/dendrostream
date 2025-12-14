// import globalStylesheet from '../../../myStyles';

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../assets/stf-logo.png';

export default function Footer({ children }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    const navigate = useNavigate();

    return (
        <footer className="bg-light text-center text-lg-start py-3 border-top responsive-footer">
            <div className="d-flex flex-row container text-center justify-content-between responsive-footer-flex">
                <p className="text-muted">© 2025 Tug O'Flaherty</p>
                <Link className="text-muted" to='/acknowledgements'>Acknowledgements</Link>
            </div>
        </footer>
    );
}