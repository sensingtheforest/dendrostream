import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import logo from '../src/assets/stf-logo.png';
import { SUPPRESS_ERRORS } from './settings/EnvironmentVariables.jsx';

function Root() {
  const [isSupported, setIsSupported] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);

  // Suppress All Errors
  if (SUPPRESS_ERRORS) {
    console.error = () => {};
    console.warn = () => {};
    console.log = () => {};
    window.onerror = () => true;
    window.onunhandledrejection = () => true;
  }

  function isBrowserSupported() {
    const hasWebAudio = !!(window.AudioContext || window.webkitAudioContext);
    const hasCanvas = !!document.createElement('canvas').getContext;
    const hasSVG = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
    const hasWebGL = (() => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && canvas.getContext('webgl'));
      } catch (e) {
        return false;
      }
    })();
    return hasWebAudio && hasCanvas && hasSVG && hasWebGL;
  }

  useEffect(() => setIsSupported(isBrowserSupported()), []);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (isSupported === false) ? (
    <StrictMode>
      <div className="unsupported-display-width">
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <img src={logo} alt='Sensing the Forest Logo' style={{ width: 'auto', height: '75px' }} />
          <i className="bi bi-soundwave" style={{ fontSize: '5rem', color: 'green' }}></i>
          <h1>Tree Sonification and Visualisation Tool</h1>
          <i className="bi bi-emoji-frown" style={{ fontSize: '5rem' }}></i>
          <h2 className='m-3'>Unsupported Browser</h2>
          <h4 className='m-3'>Unfortunately, your browser does not currently support the functionality required by our tool.</h4>
          <h4 className='m-3'>Please upgrade your browser, use a different browser, or try a different device.</h4>
          <h6 className='m-3'>A modern browser (Chrome, Firefox (25+), Safari (6+) or Chromium-based Edge) is required.</h6>
        </div>
      </div>
    </StrictMode>
  ) : (width < 300) ? (
    <StrictMode>
      <div className="unsupported-display-width">
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <img src={logo} alt='Sensing the Forest Logo' style={{ width: 'auto', height: '75px' }} />
          <i className="bi bi-soundwave" style={{ fontSize: '5rem', color: 'green' }}></i>
          <h1>Tree Sonification and Visualisation Tool</h1>
          <i className="bi bi-emoji-frown" style={{ fontSize: '5rem' }}></i>
          <h2 className='m-3'>Small Browser Width</h2>
          <h4 className='m-3'>Unfortunately, the browser width is too small to offer you a good experience with our tool.</h4>
          <h4 className='m-3'>Please increase the browser width or try a different device.</h4>
          <h6 className='m-3'>A minimum browser width of 300 pixels is required.</h6>
        </div>
      </div>
    </StrictMode>
  ) : <App />;
}

createRoot(document.getElementById('root')).render(<Root />);