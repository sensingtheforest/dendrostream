// import globalStylesheet from '../../../myStyles';

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bs-stepper/dist/css/bs-stepper.min.css';

export default function DropdownSonifierStepper({ children, selected=false }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    const location = useLocation();
    const navigate = useNavigate();

    // Based on Non linear stepper: https://johann-s.github.io/bs-stepper/ and https://www.npmjs.com/package/bs-stepper

    return (
        <div style={{ maxWidth: '100%', marginBottom: '2rem' }}>
            <div id="stepper2" className="bs-stepper">
                <div className="bs-stepper-header" role="tablist">
                    <div className={"step" + (selected === 'start' ? " active" : "")} data-target="#test-nl-1" onClick={() => navigate('/custom-audio')}>
                        <button type="button" className="step-trigger" role="tab" id="stepper2trigger1" aria-controls="test-nl-1" aria-selected={(selected === 'start' ? "true" : "false")}>
                            <span className="bs-stepper-circle">
                                <span className="fas fa-user" aria-hidden="true"></span>
                            </span>
                            <span className={"bs-stepper-label"} style={{ color: selected === 'start' ? '#007bff' : 'inherit' }}>Start</span>
                        </button>
                    </div>
                    <div className="bs-stepper-line"></div>
                    {/* <div className={"step" + (selected == 'data' ? " active" : "")} data-target="#test-nl-2" onClick={() => navigate('/custom-audio/data')}>
                        <button type="button" className="step-trigger" role="tab" id="stepper2trigger2" aria-controls="test-nl-2" aria-selected={(selected === 'data' ? "true" : "false")}>
                            <span className="bs-stepper-circle">
                                <span className="fas fa-map-marked" aria-hidden="true"></span>
                            </span>
                            <span className="bs-stepper-label" style={{ color: selected === 'data' ? '#007bff' : 'inherit' }}>Data</span>
                        </button>
                    </div>
                    <div className="bs-stepper-line"></div> */}
                    {/* <div className={"step" + (selected == 'mode' ? " active" : "")} data-target="#test-nl-2" onClick={() => navigate('/custom-audio/mode')}>
                        <button type="button" className="step-trigger" role="tab" id="stepper2trigger2" aria-controls="test-nl-2" aria-selected={(selected === 'mode' ? "true" : "false")}>
                            <span className="bs-stepper-circle">
                                <span className="fas fa-map-marked" aria-hidden="true"></span>
                            </span>
                            <span className="bs-stepper-label" style={{ color: selected === 'mode' ? '#007bff' : 'inherit' }}>Mode</span>
                        </button>
                    </div>
                    <div className="bs-stepper-line"></div> */}
                    <div className={"step" + (selected == 'sounds' ? " active" : "")} data-target="#test-nl-3" onClick={() => navigate('/custom-audio/sounds')}>
                        <button type="button" className="step-trigger" role="tab" id="stepper2trigger3" aria-controls="test-nl-3" aria-selected={(selected === 'sounds' ? "true" : "false")}>
                            <span className="bs-stepper-circle">
                                <span className="fas fa-save" aria-hidden="true"></span>
                            </span>
                            <span className="bs-stepper-label" style={{ color: selected === 'sounds' ? '#007bff' : 'inherit' }}>Sounds</span>
                        </button>
                    </div>
                    <div className="bs-stepper-line"></div>
                    <div className={"step" + (selected == 'refine' ? " active" : "")} data-target="#test-nl-4" onClick={() => navigate('/custom-audio/refine')}>
                        <button type="button" className="step-trigger" role="tab" id="stepper2trigger4" aria-controls="test-nl-4" aria-selected={(selected === 'refine' ? "true" : "false")}>
                            <span className="bs-stepper-circle">
                                <span className="fas fa-save" aria-hidden="true"></span>
                            </span>
                            <span className="bs-stepper-label" style={{ color: selected === 'refine' ? '#007bff' : 'inherit' }}>Refine</span>
                        </button>
                    </div>
                    <div className="bs-stepper-line"></div>
                    <div className={"step" + (selected == 'tone' ? " active" : "")} data-target="#test-nl-5" onClick={() => navigate('/custom-audio/tone')}>
                        <button type="button" className="step-trigger" role="tab" id="stepper2trigger5" aria-controls="test-nl-5" aria-selected={(selected === 'tone' ? "true" : "false")}>
                            <span className="bs-stepper-circle">
                                <span className="fas fa-save" aria-hidden="true"></span>
                            </span>
                            <span className="bs-stepper-label" style={{ color: selected === 'tone' ? '#007bff' : 'inherit' }}>Tone</span>
                        </button>
                    </div>
                    <div className="bs-stepper-line"></div>
                    <div className={"step" + (selected == 'beat' ? " active" : "")} data-target="#test-nl-6" onClick={() => navigate('/custom-audio/beat')}>
                        <button type="button" className="step-trigger" role="tab" id="stepper2trigger6" aria-controls="test-nl-6" aria-selected={(selected === 'beat' ? "true" : "false")}>
                            <span className="bs-stepper-circle">
                                <span className="fas fa-save" aria-hidden="true"></span>
                            </span>
                            <span className="bs-stepper-label" style={{ color: selected === 'beat' ? '#007bff' : 'inherit' }}>Beat</span>
                        </button>
                    </div>
                    <div className="bs-stepper-line"></div>
                    <div className={"step" + (selected == 'pitch' ? " active" : "")} data-target="#test-nl-7" onClick={() => navigate('/custom-audio/pitch')}>
                        <button type="button" className="step-trigger" role="tab" id="stepper2trigger7" aria-controls="test-nl-7" aria-selected={(selected === 'pitch' ? "true" : "false")}>
                            <span className="bs-stepper-circle">
                                <span className="fas fa-save" aria-hidden="true"></span>
                            </span>
                            <span className="bs-stepper-label" style={{ color: selected === 'pitch' ? '#007bff' : 'inherit' }}>Pitch</span>
                        </button>
                    </div>
                    <div className="bs-stepper-line"></div>
                    <div className={"step" + (selected == 'layers' ? " active" : "")} data-target="#test-nl-8" onClick={() => navigate('/custom-audio/layers')}>
                        <button type="button" className="step-trigger" role="tab" id="stepper2trigger8" aria-controls="test-nl-8" aria-selected={(selected === 'layers' ? "true" : "false")}>
                            <span className="bs-stepper-circle">
                                <span className="fas fa-save" aria-hidden="true"></span>
                            </span>
                            <span className="bs-stepper-label" style={{ color: selected === 'layers' ? '#007bff' : 'inherit' }}>Layers</span>
                        </button>
                    </div>
                    <div className="bs-stepper-line"></div>
                    {/* <div className={"step" + (selected == 'dynamics' ? " active" : "")} data-target="#test-nl-9" onClick={() => navigate('/custom-audio/dynamics')}>
                        <button type="button" className="step-trigger" role="tab" id="stepper2trigger9" aria-controls="test-nl-9" aria-selected={(selected === 'dynamics' ? "true" : "false")}>
                            <span className="bs-stepper-circle">
                                <span className="fas fa-save" aria-hidden="true"></span>
                            </span>
                            <span className="bs-stepper-label" style={{ color: selected === 'dynamics' ? '#007bff' : 'inherit' }}>Dynamics</span>
                        </button>
                    </div>
                    <div className="bs-stepper-line"></div> */}
                    <div className={"step" + (selected == 'effects' ? " active" : "")} data-target="#test-nl-10" onClick={() => navigate('/custom-audio/effects')}>
                        <button type="button" className="step-trigger" role="tab" id="stepper2trigger10" aria-controls="test-nl-10" aria-selected={(selected === 'effects' ? "true" : "false")}>
                            <span className="bs-stepper-circle">
                                <span className="fas fa-save" aria-hidden="true"></span>
                            </span>
                            <span className="bs-stepper-label" style={{ color: selected === 'effects' ? '#007bff' : 'inherit' }}>Effects</span>
                        </button>
                    </div>
                    <div className="bs-stepper-line"></div>
                    <div className={"step" + (selected == 'done' ? " active" : "")} data-target="#test-nl-11" onClick={() => navigate('/custom-audio/done')}>
                        <button type="button" className="step-trigger" role="tab" id="stepper2trigger11" aria-controls="test-nl-11" aria-selected={(selected === 'done' ? "true" : "false")}>
                            <span className="bs-stepper-circle">
                                <span className="fas fa-save" aria-hidden="true"></span>
                            </span>
                            <span className="bs-stepper-label" style={{ color: selected === 'done' ? '#007bff' : 'inherit' }}>Done</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}