import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from '../../../ui/button/Button';
import React, { useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '../PageLayout';
import ContactForm from '../../../ui/form/ContactForm';


export default function HelpContactUs() {
  const navigate = useNavigate();
  return (
    <PageLayout title='Contact Us' backLink='help'>
      <i className="bi bi-headset" style={{ fontSize: '4em' }} />
      <p style={{ padding: '1rem' }}><em>Get in Touch</em></p>
      <p>If you have any questions, or require additional support with the tool, please do not hesistate to contact us.</p>
      <ContactForm />
      <h2 style={{ marginTop: '2rem' }}>Social Media</h2>
      <div className="d-flex justify-content-center align-items-center v-100">
        <div className='d-flex flex-column'>
          <div className='d-flex align-items-center responsive-link'>
            <i className="bi bi-envelope" style={{ fontSize: '2em' }} />
            <h5 className='m-1'>Email: <a href='mailto:t.f.oflaherty@se24.qmul.ac.uk?subject=Sensing%20the%20Forest%20SV%20Tool' style={{ textDecoration: 'none', color: 'black' }}>t.f.oflaherty@se24.qmul.ac.uk</a></h5>
          </div>
          <div className='d-flex align-items-center responsive-link'>
            <i className="bi bi-globe" style={{ fontSize: '2em' }} />
            <h5 className='m-1'>Website: <a href='https://sensingtheforest.github.io/' target='new' style={{ textDecoration: 'none', color: 'black' }}>https://sensingtheforest.github.io</a></h5>
          </div>
          <div className='d-flex align-items-center responsive-link'>
            <i className="bi bi-github" style={{ fontSize: '2em' }} />
            <h5 className='m-1'>GitHub: <a href='https://github.com/sensingtheforest' target='new' style={{ textDecoration: 'none', color: 'black' }}>@sensingtheforest</a></h5>
          </div>
          <div className='d-flex align-items-center responsive-link'>
            <i className="bi bi-instagram" style={{ fontSize: '2em' }} />
            <h5 className='m-1'>Instagram: <a href='https://www.instagram.com/sensingtheforest' target='new' style={{ textDecoration: 'none', color: 'black' }}>@sensingtheforest</a></h5>
          </div>
          <div className='d-flex align-items-center responsive-link'>
            <i className="bi bi-twitter-x" style={{ fontSize: '2em' }} />
            <h5 className='m-1'>X/Twitter: <a href='https://x.com/sensingforest' target='new' style={{ textDecoration: 'none', color: 'black' }}>@sensingforest</a></h5>
          </div>
          <div className='d-flex align-items-center responsive-link'>
            <i className="bi bi-youtube" style={{ fontSize: '2em' }} />
            <h5 className='m-1'>YouTube: <a href='https://www.youtube.com/@sensingtheforest' target='new' style={{ textDecoration: 'none', color: 'black' }}>@sensingtheforest</a></h5>
          </div>
          <div className='d-flex align-items-center responsive-link'>
            <i className="bi bi-rss" style={{ fontSize: '2em' }} />
            <h5 className='m-1'>RSS: <a href='https://sensingtheforest.github.io/feed.xml' target='new' style={{ textDecoration: 'none', color: 'black' }}>https://sensingtheforest.github.io/feed.xml</a></h5>
          </div>
        </div>
      </div>
      
    </PageLayout>
  )
}