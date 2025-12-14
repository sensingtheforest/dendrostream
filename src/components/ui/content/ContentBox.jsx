// import globalStylesheet from '../../../myStyles';

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ContentBox({ children, image='', title='', subtitle='', body='', caption='', imageAlt='', link='', separator=true }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-row px-3 responsive-contentbox" style={{ borderBottom: separator ? '1px solid black' : '0px', padding: '1rem 0', marginBottom: '2rem' }} {...(link ? { onClick: () => navigate(`/${link}`) } : {})}>
            <div 
                className="d-flex flex-column justify-content-center align-items-center" 
                style={{
                    flex: 1,
                    height: '100%',
                    padding: '1rem',
                    maxWidth: '25%',
                    marginBottom: '0rem'
                }}
            >
                {typeof image === 'string' ? (
                    <img src={image} alt={imageAlt} style={{ maxWidth: '100%', height: 'auto', borderRadius: '2px' }} />) : (image)
                }
                <p style={{ padding: '1rem' }}><em>{caption}</em></p>
            </div>
            <div className="d-flex flex-column align-items-start ps-4" style={{ flex: 3, maxWidth: '75%', marginBottom: '4rem' }}>
                <h2 className="m-0">{title}</h2>
                <h4 className="fw-normal mt-2">{subtitle}</h4>
                <p style={{ textAlign: 'left' }}>{body}</p>
                { children }
            </div>
        </div>
    );
}