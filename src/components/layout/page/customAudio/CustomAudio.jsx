import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from '../../../ui/button/Button';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '../PageLayout';
import DropdownSonifierStepper from '../../../ui/stepper/DropdownSonifierStepper';

export default function CustomAudio({ endpoints={} }) {
  const navigate = useNavigate();
  const comingSoon = false;
  return (
    <PageLayout title='Custom Audio'>
      {
        !comingSoon ? (
          <>
            <DropdownSonifierStepper selected='start' />
            <div className='p-5'>
              <h4>Start creating your own sonification using our simple selection options.</h4>
              <br />
              <h5>Create musical, semi-musical or scientific sonifications.</h5>
              <br />
              <h4 style={{ marginBottom: '1rem' }}>About:</h4>
              <h5>This tool offers default options.</h5>
              <h5>If you are unsure of how to choose a selection option, feel free to use the default value provided, or change the values to see their effects on the generated audio.</h5>
            </div>
            <div style={{ marginTop: '2rem' }}>
              <Button onClick={() => navigate('/')} hasTitle title='Exit' />
              <Button onClick={() => navigate('/custom-audio/sounds')} hasTitle title='Start' />
            </div>
          </>
        )
        : <><h2>Stay Tuned!</h2><br /><h2>New Feature Coming Soon!</h2></>
      }

      {/* <Button hasTitle title='Help' onClick={() => navigate('/help/custom-audio')} /> */}
    </PageLayout>
  )
}