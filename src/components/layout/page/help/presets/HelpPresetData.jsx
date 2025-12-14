// import globalStylesheet from '../../../myStyles';

import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import VolumeSlider from '../../../../ui/slider/VolumeSlider';
import treeIcon from '../../../../../assets/tree-icon.jpg';
import Dropdown from '../../../../ui/dropdown/Dropdown';

export default function HelpPresetData({ children, introduction='', helpNavigate=()=>{}, averagingPeriod=false }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    const navigate = useNavigate();

    return (
        <div>
            <h4 style={{ textAlign: 'left' }}>Introduction</h4>
            <p style={{ textAlign: 'left' }}>{introduction}</p>
            <p className='mb-5' style={{ textAlign: 'left' }}>This Help Guide contains a basic overview to the buttons and functionality available within the tool.</p>
            <h4 style={{ textAlign: 'left' }}>Information Guides</h4>
            <h5 className='mt-4' style={{ textAlign: 'left' }}>Tree</h5>
            <div>
                <img src={treeIcon} style={{ width: '2em', marginTop: '0.1em', marginBottom: '0.3rem' }} alt='Tree Icon' />
                <h6>Tree</h6>
            </div>
            <p style={{ textAlign: 'left' }}>Clicking the 'Tree' button opens a modal detailing information about the tree currently being presented. This includes the tree's type, location, and care instructions.</p>
            <h5 className='mt-4' style={{ textAlign: 'left' }}>About</h5>
            <div>
                <i className="bi bi-info-circle" style={{ fontSize: '1.5em' }}></i>
                <h6>About</h6>
            </div>
            <p style={{ textAlign: 'left' }}>Clicking the 'About' button opens a modal detailing information about the tree and climate data variables currently being presented. This includes the variable's type, meaning, observations, and mappings used in the presentation.</p>
            <h5 className='mt-4' style={{ textAlign: 'left' }}>Help</h5>
            <div>
                <i className="bi bi-question-circle" style={{ fontSize: '1.5em' }}></i>
                <h6>Help</h6>
            </div>
            <p className='mb-5' style={{ textAlign: 'left' }}>Clicking the 'Help' button opens this modal detailing information about how to use the functionality and buttons used in the tool.</p>
            <h4 style={{ textAlign: 'left' }}>Playback Controls</h4>
            <h5 className='mt-4' style={{ textAlign: 'left' }}>Introduction</h5>
            <p style={{ textAlign: 'left' }}>The playback controls are used to manage the output of the visualisation and sonification presented. The appropriate playback control will be highlighted with a bold label, to indicate the active system mode.</p>
            <h5 className='mt-4' style={{ textAlign: 'left' }}>Play</h5>
            <div>
                <i className='bi bi-play-circle' style={{ fontSize: '1.5em' }}></i>
                <h6>Play</h6>
            </div>
            <p style={{ textAlign: 'left' }}>Clicking the 'Play' button will start playback of the data visualisation and sonification.</p>
            <div>
                <i className='bi bi-play-circle-fill' style={{ fontSize: '1.5em' }}></i>
                <h6>Play</h6>
            </div>
            <p style={{ textAlign: 'left' }}>The system is currently playing the data visualisation and sonification.</p>
            <h5 className='mt-4' style={{ textAlign: 'left' }}>Pause</h5>
            <div>
                <i className='bi bi-pause-circle' style={{ fontSize: '1.5em' }}></i>
                <h6>Pause</h6>
            </div>
            <p style={{ textAlign: 'left' }}>Clicking the 'Pause' button will pause (temporarily suspend) playback of the data visualisation and sonification. When resumed, playback will start from the current position in the dataset.</p>
            <div>
                <i className='bi bi-pause-circle-fill' style={{ fontSize: '1.5em' }}></i>
                <h6>Pause</h6>
            </div>
            <p style={{ textAlign: 'left' }}>The system is currently paused in presenting the data visualisation and sonification.</p>
            <h5 className='mt-4' style={{ textAlign: 'left' }}>Stop</h5>
            <div>
                <i className='bi bi-stop-circle' style={{ fontSize: '1.5em' }}></i>
                <h6>Stop</h6>
            </div>
            <p style={{ textAlign: 'left' }}>Clicking the 'Stop' button will stop (permanently suspend) playback of the data visualisation and sonification. When resumed, playback will start from the beginning of the dataset.</p>
            <div>
                <i className='bi bi-stop-circle-fill' style={{ fontSize: '1.5em' }}></i>
                <h6>Stop</h6>
            </div>
            <p style={{ textAlign: 'left' }}>The system is currently stopped in presenting the data visualisation and sonification.</p>
            <h5 className='mt-4' style={{ textAlign: 'left' }}>Mute</h5>
            <div>
                <i className='bi bi-volume-mute' style={{ fontSize: '1.5em' }}></i>
                <h6>Mute</h6>
            </div>
            <p style={{ textAlign: 'left' }}>Clicking the 'Mute' button will suspend the audio output of the data visualisation and sonification, although allowing the visualisation and sonification to continue to play.</p>
            <div>
                <i className='bi bi-volume-mute-fill' style={{ fontSize: '1.5em' }}></i>
                <h6>Unmute</h6>
            </div>
            <p style={{ textAlign: 'left' }}>The system is currently suspending the audio output of the data visualisation and sonification. Clicking the 'Unmute' button will resume audio output of the data visualisation and sonification.</p>
            <h5 className='mt-4' style={{ textAlign: 'left' }}>Hide</h5>
            <div>
                <i className='bi bi-eye-slash' style={{ fontSize: '1.5em' }}></i>
                <h6>Hide</h6>
            </div>
            <p style={{ textAlign: 'left' }}>Clicking the 'Hide' button will suspend the visual output of the data visualisation and sonification, although allowing the visualisation and sonification to continue to play.</p>
            <div>
                <i className='bi bi-eye-slash-fill' style={{ fontSize: '1.5em' }}></i>
                <h6>Unhide</h6>
            </div>               
            <p className='mb-5' style={{ textAlign: 'left' }}>The system is currently suspending the visual output of the data visualisation and sonification. Clicking the 'Unhide' button will resume visual output of the data visualisation and sonification.</p>
            <h4 style={{ textAlign: 'left' }}>Options</h4>
            <h5 className='mt-4' style={{ textAlign: 'left' }}>Introduction</h5>
            <p style={{ textAlign: 'left' }}>The Options controls are used to manage the output of the individual variables within the visualisation and sonification presented. Clicking the Options button will open/close the Options Panel containing the Options controls.</p>
            
            <h5 className='mt-4' style={{ textAlign: 'left' }}>Data Source</h5>
            <div className='d-flex flex-column mt-3'>
                <h6 style={{ textAlign: 'left' }}>Data Source</h6>
                <Dropdown isDisabled={true} />
            </div>
            <p style={{ textAlign: 'left' }}>Clicking the dropdown list will display the available sources of data for the visualisation and sonification. Clicking on a list option will select the respective tree dataset for use in the current visualisation and sonification.</p>
            {
                averagingPeriod ? (
                    <>
                        <h5 className='mt-4' style={{ textAlign: 'left' }}>Averaging Period</h5>
                        <div className='d-flex flex-column mt-3'>
                            <h6 style={{ textAlign: 'left' }}>Averaging Period</h6>
                            <Dropdown isDisabled={true} />
                        </div>
                        <p style={{ textAlign: 'left' }}>Clicking the dropdown list will display the averaging time period window of data to use for the visualisation and sonification. Clicking on a list option will select the respective averaging time period window for use in the current visualisation and sonification.</p>
                    </>
                ) : (
                    <>
                        
                        <h5 className='mt-4' style={{ textAlign: 'left' }}>Data Range</h5>
                        <div className='d-flex flex-column mt-3'>
                            <h6 style={{ textAlign: 'left' }}>Data Range</h6>
                            <Dropdown isDisabled={true} />
                        </div>
                        <p style={{ textAlign: 'left' }}>Clicking the dropdown list will display the data time range of data to use for the visualisation and sonification. Clicking on a list option will select the respective data time range for use in the current visualisation and sonification.</p>
                    </>
                )
            }
            <h5 className='mt-4' style={{ textAlign: 'left' }}>Playback Speed</h5>
            <div className='d-flex flex-column mt-3'>
                <h6 style={{ textAlign: 'left' }}>Playback Speed</h6>
                <VolumeSlider volume={50} disabled />
            </div>
            <p style={{ textAlign: 'left' }}>Sliding the playback speed slider to the left will reduce the playback speed level of the visualisation and sonification. Sliding the playback speed slider to the right will increase the playback speed level of the visualisation and sonification. A desired playback speed level, from 0 to 100 (slowest to fastest) can be input directly into the accompanying playback speed input field, or increased or decreased incrementally, using its up and down arrows respectively. The current playback speed level is displayed both on the slider, and as a definitive value in the input field.</p>
            <h5 className='mt-4' style={{ textAlign: 'left' }}>Graph Zoom</h5>
            <div className='d-flex flex-column mt-3'>
                <h6 style={{ textAlign: 'left' }}>Graph Zoom</h6>
                <VolumeSlider volume={50} disabled />
            </div>
            <p style={{ textAlign: 'left' }}>Sliding the graph zoom slider to the left will reduce the visual zoom level of the graph. Sliding the graph zoom slider to the right will increase the visual zoom level of the graph. A desired visual zoom level, from 0 to 100 (smallest to largest) can be input directly into the accompanying graph zoom input field, or increased or decreased incrementally, using its up and down arrows respectively. The current graph zoom level is displayed both on the slider, and as a definitive value in the input field.</p>
            <h5 className='mt-4' style={{ textAlign: 'left' }}>Master Volume</h5>
            <div className='d-flex flex-column mt-3'>
                <h6 style={{ textAlign: 'left' }}>Master Volume</h6>
                <VolumeSlider volume={50} disabled />
            </div>
            <p style={{ textAlign: 'left' }}>Sliding the master volume slider to the left will reduce the overall audio output level of the sonification. Sliding the volume slider to the right will increase the audio output level of the sonification. A desired audio volume level, from 0 to 100 (quietest to loudest) can be input directly into the accompanying volume input field, or increased or decreased incrementally, using its up and down arrows respectively. The current audio output level for the sonification is displayed both on the slider, and as a definitive value in the input field.</p>
            <h5 className='mt-4' style={{ textAlign: 'left' }}>Volume</h5>
            <div className='d-flex flex-column mt-3'>
                <h6 style={{ textAlign: 'left' }}>Volume</h6>
                <VolumeSlider volume={50} disabled />
            </div>
            <p style={{ textAlign: 'left' }}>Sliding the volume slider to the left will reduce the audio output level of the associated data variable's visualisation and sonification. Sliding the volume slider to the right will increase the audio output level of the associated data variable's visualisation and sonification. A desired audio volume level, from 0 to 100 (quietest to loudest) can be input directly into the accompanying volume input field, or increased or decreased incrementally, using its up and down arrows respectively. The current audio output level for the associated variable is displayed both on the slider, and as a definitive value in the input field.</p>
            <h5 className='mt-4' style={{ textAlign: 'left' }}>Mute</h5>
            <div>
                <i className='bi bi-volume-mute' style={{ fontSize: '1.5em' }}></i>
                <h6>Mute</h6>
            </div>
            <p style={{ textAlign: 'left' }}>Clicking the 'Mute' button will suspend the audio output of the associated data variable's visualisation and sonification, although allowing the visualisation and sonification to continue to play.</p>
            <div>
                <i className='bi bi-volume-mute-fill' style={{ fontSize: '1.5em' }}></i>
                <h6>Unmute</h6>
            </div>
            <p style={{ textAlign: 'left' }}>The system is currently suspending the associated data variable's audio output in the data visualisation and sonification. Clicking the 'Unmute' button will resume audio output of the associated data variable's visualisation and sonification.</p>
            <h5 className='mt-4' style={{ textAlign: 'left' }}>Hide</h5>
            <div>
                <i className='bi bi-eye-slash' style={{ fontSize: '1.5em' }}></i>
                <h6>Hide</h6>
            </div>
            <p style={{ textAlign: 'left' }}>Clicking the 'Hide' button will suspend the visual output of the associated data variable's visualisation and sonification, although allowing the visualisation and sonification to continue to play.</p>
            <div>
                <i className='bi bi-eye-slash-fill' style={{ fontSize: '1.5em' }}></i>
                <h6>Unhide</h6>
            </div>
            <p className='mb-5' style={{ textAlign: 'left' }}>The system is currently suspending the associated data variable's visual output in the data visualisation and sonification. Clicking the 'Unhide' button will resume visual output of the associated data variable's visualisation and sonification.</p>
            <h4 className='mt-4' style={{ textAlign: 'left' }}>Further Information</h4>
            <p style={{ textAlign: 'left' }}>This brief Help Guide, containing explanations on the main tool controls, offers a simple overview of the core functionality.</p>
            <p style={{ textAlign: 'left' }}>For further information or support, please <a href='#' onClick={() => helpNavigate()}>contact us</a>.</p>
            { children }
        </div>
    );
}
