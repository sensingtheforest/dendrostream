import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from '../../../ui/button/Button';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '../PageLayout';
import DashboardButton from '../../../ui/dashboard/DashboardButton';
import DashboardContainer from '../../../ui/dashboard/DashboardContainer';


export default function About() {
  const navigate = useNavigate();
  return (
    <PageLayout title='About'>
      <div style={{  }}>
        <DashboardContainer>
          <DashboardButton image={<i className="bi bi-clipboard-check" style={{ fontSize: '4em' }} />} title='Project' subtitle='About' link='about/project' />
          <DashboardButton image={<i className="bi bi-tree" style={{ fontSize: '4em' }} />} title='Trees' subtitle='About' link='about/trees' />
          <DashboardButton image={<i className="bi bi-cpu" style={{ fontSize: '4em' }} />} title='Tree Talker Devices' subtitle='About' link='about/tree-talker-devices' />
          <DashboardButton image={<i className="bi bi-broadcast" style={{ fontSize: '4em' }} />} title='Sensor Data Values' subtitle='About' link='about/sensor-data-values' />
          <DashboardButton image={<i className="bi bi-people" style={{ fontSize: '4em' }} />} title='Team' subtitle='About' link='about/team' />
          <DashboardButton image={<i className="bi bi-headset" style={{ fontSize: '4em' }} />} title='Contact Us' subtitle='Further Support' link='help/contact-us' />
        </DashboardContainer>
      </div>
    </PageLayout>
  )
}