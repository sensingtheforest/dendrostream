import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from '../../../../ui/button/Button';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '../../PageLayout';
import DashboardButton from '../../../../ui/dashboard/DashboardButton';
import DashboardContainer from '../../../../ui/dashboard/DashboardContainer';


export default function DerivedDataHelp() {
  const navigate = useNavigate();
  return (
    <PageLayout title='Derived Data Help' backLink='help'>
      <div style={{  }}>
        <DashboardContainer>
          <DashboardButton image={<div className='d-flex gap-5'><i className="bi bi-graph-up-arrow" style={{ fontSize: '4em', color: '#1B1B1B' }} /><i className="bi bi-flask-fill" style={{ fontSize: '4em', color: '#1B1B1B' }} /></div>} title='Preset 1' subtitle='Help' link='help/derived-data/preset-1' />
          <DashboardButton image={<div className='d-flex gap-5'><i className="bi bi-border-all" style={{ fontSize: '4em', color: '#1B1B1B' }} /><i className="bi bi-flask-fill" style={{ fontSize: '4em', color: '#1B1B1B' }} /></div>} title='Preset 2' subtitle='Help' link='help/derived-data/preset-2' />
          <DashboardButton image={<div className='d-flex gap-5'><i className="bi bi-bar-chart-fill" style={{ fontSize: '4em', color: '#1B1B1B' }} /><i className="bi bi-leaf-fill" style={{ fontSize: '4em', color: '#1B1B1B' }} /></div>} title='Preset 3' subtitle='Help' link='help/derived-data/preset-3' />
          <DashboardButton image={<div className='d-flex gap-5'><i className="bi bi-speedometer" style={{ fontSize: '4em', color: '#1B1B1B' }} /><i className="bi bi-music-note" style={{ fontSize: '4em', color: '#1B1B1B' }} /></div>} title='Preset 4' subtitle='Help' link='help/derived-data/preset-4' />
          <DashboardButton image={<div className='d-flex gap-5'><i className="bi bi-film" style={{ fontSize: '4em', color: '#1B1B1B' }} /><i className="bi bi-music-note-beamed" style={{ fontSize: '4em', color: '#1B1B1B' }} /></div>} title='Preset 5' subtitle='Help' link='help/derived-data/preset-5' />
        </DashboardContainer>
      </div>
    </PageLayout>
  )
}