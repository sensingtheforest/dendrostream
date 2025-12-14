// import globalStylesheet from '../../../myStyles';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import logo from '../../../assets/stf-logo.png';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../../App.css';


export default function NavBar({ children }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    const navigate = useNavigate();
    const location = useLocation();
    const isPrimaryDataActive = location.pathname.startsWith('/primary-data');
    const isDerivedDataActive = location.pathname.startsWith('/derived-data');
    const isAboutActive = location.pathname.startsWith('/about');
    const isHelpActive = location.pathname.startsWith('/help');

    return (
        <>
<nav className='navbar navbar-light bg-light'>
    <div className='container-fluid justify-content-center'>
        <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
        <ul className='navbar-nav d-flex'>
            <li className='nav-item me-3'>
                <NavLink className={({ isActive }) => (isActive ? 'nav-link fw-bold' : 'nav-link')} to='/'>Home</NavLink>
            </li>
            <li className='nav-item me-3'>
                <NavLink className={({ isActive }) => (isActive ? 'nav-link fw-bold' : 'nav-link')} to='/primary-data'>Primary Data</NavLink>
            </li>
            <li className='nav-item me-3'>
                <NavLink className={({ isActive }) => (isActive ? 'nav-link fw-bold' : 'nav-link')} to='/derived-data'>Derived Data</NavLink>
            </li>
            <li className='nav-item me-3'>
                <NavLink className={({ isActive }) => (isActive ? 'nav-link fw-bold' : 'nav-link')} to='/personalised-data'>Personalised Data</NavLink>
            </li>
            <li className='nav-item me-3'>
                <NavLink className={({ isActive }) => (isActive ? 'nav-link fw-bold' : 'nav-link')} to='/custom-audio'>Custom Audio</NavLink>
            </li>
            <li className='nav-item me-3'>
                <NavLink className={({ isActive }) => (isActive ? 'nav-link fw-bold' : 'nav-link')} to='/source-data'>Source Data</NavLink>
            </li>
            <li className='nav-item me-3'>
                <NavLink className={({ isActive }) => (isActive ? 'nav-link fw-bold' : 'nav-link')} to='/about'>About</NavLink>
            </li>
            <li className='nav-item me-3'>
                <NavLink className={({ isActive }) => (isActive ? 'nav-link fw-bold' : 'nav-link')} to='/help'>Help</NavLink>
            </li>
            {/* <li className='nav-item dropdown mx-3'>
                <a
                    className={isPrimaryDataActive ? 'nav-link dropdown-toggle fw-bold' : 'nav-link dropdown-toggle'}
                    href='#'
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                >
                    Primary Data
                </a>
                <ul className='dropdown-menu'>
                    <li><NavLink className={({ isActive }) => (isActive ? 'dropdown-item fw-bold' : 'dropdown-item')} to='/primary-data' end>Overview</NavLink></li>
                    <li><NavLink className={({ isActive }) => (isActive ? 'dropdown-item fw-bold' : 'dropdown-item')} to='/primary-data/preset-1'>Preset 1</NavLink></li>
                    <li><NavLink className={({ isActive }) => (isActive ? 'dropdown-item fw-bold' : 'dropdown-item')} to='/primary-data/preset-2'>Preset 2</NavLink></li>
                    <li><NavLink className={({ isActive }) => (isActive ? 'dropdown-item fw-bold' : 'dropdown-item')} to='/primary-data/preset-3'>Preset 3</NavLink></li>
                    <li><NavLink className={({ isActive }) => (isActive ? 'dropdown-item fw-bold' : 'dropdown-item')} to='/primary-data/preset-4'>Preset 4</NavLink></li>
                    <li><NavLink className={({ isActive }) => (isActive ? 'dropdown-item fw-bold' : 'dropdown-item')} to='/primary-data/personalised'>Personalised</NavLink></li>
                </ul>
            </li>
            <li className='nav-item dropdown mx-3'>
                <a
                    className={isDerivedDataActive ? 'nav-link dropdown-toggle fw-bold' : 'nav-link dropdown-toggle'}
                    href='#'
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                >
                    Derived Data
                </a>
                <ul className='dropdown-menu'>
                    <li><NavLink className={({ isActive }) => (isActive ? 'dropdown-item fw-bold' : 'dropdown-item')} to='/derived-data' end>Overview</NavLink></li>
                    <li><NavLink className={({ isActive }) => (isActive ? 'dropdown-item fw-bold' : 'dropdown-item')} to='/derived-data/preset-1'>Preset 1</NavLink></li>
                    <li><NavLink className={({ isActive }) => (isActive ? 'dropdown-item fw-bold' : 'dropdown-item')} to='/derived-data/preset-2'>Preset 2</NavLink></li>
                    <li><NavLink className={({ isActive }) => (isActive ? 'dropdown-item fw-bold' : 'dropdown-item')} to='/derived-data/preset-3'>Preset 3</NavLink></li>
                    <li><NavLink className={({ isActive }) => (isActive ? 'dropdown-item fw-bold' : 'dropdown-item')} to='/derived-data/preset-4'>Preset 4</NavLink></li>
                    <li><NavLink className={({ isActive }) => (isActive ? 'dropdown-item fw-bold' : 'dropdown-item')} to='/derived-data/personalised'>Personalised</NavLink></li>
                </ul>
            </li>
            <li className='nav-item me-3'>
                <NavLink className={({ isActive }) => (isActive ? 'nav-link fw-bold' : 'nav-link')} to='/custom-audio'>Custom Audio</NavLink>
            </li>
            <li className='nav-item me-3'>
                <NavLink className={({ isActive }) => (isActive ? 'nav-link fw-bold' : 'nav-link')} to='/source-data'>Source Data</NavLink>
            </li>
            <li className='nav-item dropdown mx-3'>
                <a
                    className={isAboutActive ? 'nav-link dropdown-toggle fw-bold' : 'nav-link dropdown-toggle'}
                    href='#'
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                >
                    About
                </a>
                <ul className='dropdown-menu'>
                    <li><NavLink className={({ isActive }) => (isActive ? 'dropdown-item fw-bold' : 'dropdown-item')} to='/about' end>Overview</NavLink></li>
                    <li><NavLink className={({ isActive }) => (isActive ? 'dropdown-item fw-bold' : 'dropdown-item')} to='/about/project'>Project</NavLink></li>
                    <li><NavLink className={({ isActive }) => (isActive ? 'dropdown-item fw-bold' : 'dropdown-item')} to='/about/trees'>Trees</NavLink></li>
                    <li><NavLink className={({ isActive }) => (isActive ? 'dropdown-item fw-bold' : 'dropdown-item')} to='/about/tree-talker-devices'>Tree Talker Devices</NavLink></li>
                    <li><NavLink className={({ isActive }) => (isActive ? 'dropdown-item fw-bold' : 'dropdown-item')} to='/about/sensor-data-values'>Sensor Data Values</NavLink></li>
                    <li><NavLink className={({ isActive }) => (isActive ? 'dropdown-item fw-bold' : 'dropdown-item')} to='/about/team'>Team</NavLink></li>
                </ul>
            </li>
            <li className='nav-item dropdown mx-3'>
                <a
                    className={isHelpActive ? 'nav-link dropdown-toggle fw-bold' : 'nav-link dropdown-toggle'}
                    href='#'
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                >
                    Help
                </a>
                <ul className='dropdown-menu'>
                    <li><NavLink className={({ isActive }) => (isActive ? 'dropdown-item fw-bold' : 'dropdown-item')} to='/help' end>Overview</NavLink></li>
                    <li><NavLink className={({ isActive }) => (isActive ? 'dropdown-item fw-bold' : 'dropdown-item')} to='/help/primary-data'>Primary Data</NavLink></li>
                    <li><NavLink className={({ isActive }) => (isActive ? 'dropdown-item fw-bold' : 'dropdown-item')} to='/help/derived-data'>Derived Data</NavLink></li>
                    <li><NavLink className={({ isActive }) => (isActive ? 'dropdown-item fw-bold' : 'dropdown-item')} to='/help/custom-audio'>Custom Audio</NavLink></li>
                    <li><NavLink className={({ isActive }) => (isActive ? 'dropdown-item fw-bold' : 'dropdown-item')} to='/help/source-data'>Source Data</NavLink></li>
                    <li><NavLink className={({ isActive }) => (isActive ? 'dropdown-item fw-bold' : 'dropdown-item')} to='/help/contact-us'>Contact Us</NavLink></li>
                </ul>
            </li> */}
    </ul>
            </div>
  </div>
</nav>

</>
    );
}