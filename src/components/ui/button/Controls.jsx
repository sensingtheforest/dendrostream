import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function Controls({ playMode=false, pauseMode=false, stopMode=false, hideMute=false, muteMode=false, hideMode=false, hideHide=false, playOnClick=()=>{}, pauseOnClick=()=>{}, stopOnClick=()=>{}, muteOnClick=()=>{}, hideOnClick=()=>{} }) {
  const navigate = useNavigate();

  return (
    <div className='d-flex flex-row justify-content-between align-items-center responsive-controls mb-5'>
        <div className="d-flex justify-content-end" style={{ gap: '1.25rem' }}>
            <div style={{ cursor: 'pointer' }} onClick={() => playOnClick()}>
                <h4 style={{ fontWeight: playMode ? 'bold' : '' }}>Play</h4>
                <i className={`bi bi-play-circle${playMode ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
            </div>
            <div style={{ cursor: 'pointer' }} onClick={() => pauseOnClick()}>
                <h4 style={{ fontWeight: pauseMode ? 'bold' : '' }}>Pause</h4>
                <i className={`bi bi-pause-circle${pauseMode ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
            </div>
            <div style={{ cursor: 'pointer' }} onClick={() => stopOnClick()}>
                <h4 style={{ fontWeight: stopMode ? 'bold' : '' }}>Stop</h4>
                <i className={`bi bi-stop-circle${stopMode ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
            </div>
        </div>
        <div className="d-flex justify-content-end" style={{ gap: '1.25rem' }}>
            {
                !hideMute && (
                    <div className='d-flex flex-column responsive-control-labels' style={{ cursor: 'pointer' }} onClick={() => muteOnClick()}>
                        <h4 style={{ fontWeight: muteMode ? 'bold' : '' }}>{muteMode ? 'Unmute' : 'Mute' }</h4>
                        <i className={`bi bi-volume-mute${muteMode ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
                    </div>
                )
            }
            {
                !hideHide && (
                    <div className='d-flex flex-column responsive-control-labels' style={{ cursor: 'pointer' }} onClick={() => hideOnClick()}>
                        <h4 style={{ fontWeight: hideMode ? 'bold' : '' }}>{hideMode ? 'Unhide' : 'Hide' }</h4>
                        <i className={`bi bi-eye-slash${hideMode ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
                    </div>
                )
            }
        </div>
    </div>
  );
}
