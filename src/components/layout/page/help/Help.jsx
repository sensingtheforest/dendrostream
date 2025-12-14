import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from '../../../ui/button/Button';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '../PageLayout';
import DashboardContainer from '../../../ui/dashboard/DashboardContainer';
import DashboardButton from '../../../ui/dashboard/DashboardButton';


export default function Help() {
  const navigate = useNavigate();
  return (
    <PageLayout title='Help'>
      <div style={{ }}>
        <DashboardContainer>
          <DashboardButton image={<i className="bi bi-broadcast-pin" style={{ fontSize: '4em' }} />} title='Primary Data ' subtitle='Help' link='help/primary-data' />
          <DashboardButton image={<i className="bi bi-cpu" style={{ fontSize: '4em' }} />} title='Derived Data' subtitle='Help' link='help/derived-data' />
          <DashboardButton image={<i className="bi bi-sliders" style={{ fontSize: '4em' }} />} title='Personalised Data' subtitle='Help' link='help/personalised-data' />
          <DashboardButton image={<i className="bi bi-headset" style={{ fontSize: '4em' }} />} title='Contact Us' subtitle='Further Support' link='help/contact-us' />
        </DashboardContainer>
      </div>
    </PageLayout>
  )
}