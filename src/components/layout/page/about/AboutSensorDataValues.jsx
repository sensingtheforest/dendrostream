import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from '../../../ui/button/Button';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '../PageLayout';
import AboutDerivedData from '../help/presets/derivedData/AboutDerivedData';


export default function AboutSensorDataValues() {
  const navigate = useNavigate();
  return (
    <PageLayout title='About the Sensor Data Values' backLink='about'>
      <AboutDerivedData referenceTone={false} dualSonification={false} vpd={true} treeMeanGrowth={true} aboutPage={true} />
    </PageLayout>
  )
}