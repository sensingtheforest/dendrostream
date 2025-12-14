import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from '../../../ui/button/Button';
import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import PageLayout from '../PageLayout';
import stfLogo from '../../../../assets/stf-logo.png';


export default function AboutProject() {
  const navigate = useNavigate();
  return (
    <PageLayout title='About the Project' backLink='about'>
      <h2 style={{ textAlign: 'left' }}>Introduction</h2>
      <p style={{ textAlign: 'left' }}>This project aims to explore different methods to present tree and climate data, notably through the methods of visualisation and sonification. By providing a wide range of preset sonic and visual outputs, it is hoped that tree and climate data received from custom tree talker devices can be interpretable by non-experts, to democratise science. The tool offers presentations including graphs, animations, drone sounds, and music, while also allowing users to create their own sonifications and visualisations, tailored to their needs and understanding.</p>
      <h2 style={{ textAlign: 'left' }}>Sensing the Forest</h2>
      <div className='d-flex justify-content-center align-items-center gap-5'>
          <img className='m-2' src={stfLogo} alt='Sensing the Forest and Dendrostream Logos' style={{ height: '4rem', width: 'auto' }} />
          <div className='d-flex justify-content-center align-items-center gap-2'>
            <i className="bi bi-soundwave" style={{ fontSize: '5rem', color: 'green' }}></i>
            <h1 style={{ color: 'darkgreen' }}>Dendrostream</h1>
          </div>
      </div>
      <p style={{ padding: '1rem' }}><em>Sensing the Forest and Dendrostream Logos</em></p>
      <p style={{ textAlign: 'left' }}>Dendrostream, our sonification and visualisation tool, is a part of Sensing the Forest, a UKRI AHRC-funded project, with the aim of raising awareness of forest environmental data, and its connection to climate change. Sensing the Forest aims to engage artists, forest visitors, scientists, and the general public with forestry data, to benefit understanding of such data, using creative approaches. For further information regarding the Sensing the Forest project, including our team members, partners, collaborators, funders, and other work, please visit the <a href='https://sensingtheforest.github.io/' target='new'>Sensing the Forest</a> website.</p>
      <h2 style={{ textAlign: 'left', marginTop: '2rem' }}>About the Trees</h2>
      <i className="bi bi-tree" style={{ fontSize: '4em' }} />
      <p style={{ padding: '1rem' }}><em>Tree</em></p>
      <p style={{ textAlign: 'left' }}>This tool sonifies and visualises tree and climate data from a number of trees, currently all of which are Yuccas. Each tree is in the care of a different citizen scientist, often residing in their homes or workplaces. The trees are primarily located around different areas of London, UK, although some trees do cover different areas of the United Kingdom. For further information regarding the trees being monitored, please visit the <Link to='/about/trees'>About the Trees</Link> webpage.</p>
      <h2 style={{ textAlign: 'left', marginTop: '2rem' }}>About the Tree Talker Devices</h2>
      <i className="bi bi-cpu" style={{ fontSize: '4em' }} />
      <p style={{ padding: '1rem' }}><em>Tree Talker Device</em></p>
      <p style={{ textAlign: 'left' }}>To collect the tree and environmental data to sonify and visualise within this tool, a custom DIY hardware tree talker device is installed on each tree. This cost-effective system receives data from dendrometer, soil moisture, temperature, and humidity sensors, transmitting the collected data to a web server, for secure storage. For further information regarding the tree talker devices, please visit the <Link to='/about/tree-talker-devices'>About the Tree Talker Devices</Link> webpage.</p>
      <h2 style={{ textAlign: 'left', marginTop: '2rem' }}>About the Sensor Data Values</h2>
      <i className="bi bi-broadcast" style={{ fontSize: '4em' }} />
      <p style={{ padding: '1rem' }}><em>Sensor Data Values</em></p>
      <p style={{ textAlign: 'left' }}>The hardware device's sensors offer displacement (dendrometer), soil moisture, temperature, and humidity readings from the tree and surrounding environment. These values can directly interplay with each other, and also allow for additional insights to be made, relating to the tree's health and stress, and climate change. For further information regarding the sensor data values, please visit the <Link to='/about/sensor-data-values'>About the Sensor Data Values</Link> webpage.</p>
      <h2 style={{ textAlign: 'left', marginTop: '2rem' }}>About the Team</h2>
      <i className="bi bi-people" style={{ fontSize: '4em' }} />
      <p style={{ padding: '1rem' }}><em>Team</em></p>
      <p style={{ textAlign: 'left' }}>Working with an interdisciplinary team, alongside a participatory design user study, the tool was developed to attempt to present data in meaningful ways for a broad range of users, including scientists, artists, and the general public. For more information on the team behind this project, please visit the <Link to='/about/team'>About the Team</Link> webpage.</p>
      <h2 style={{ textAlign: 'left', marginTop: '2rem' }}>Contact Us</h2>
      <i className="bi bi-headset" style={{ fontSize: '4em' }} />
      <p style={{ padding: '1rem' }}><em>Contact Us</em></p>
      <p style={{ textAlign: 'left' }}>If you have any questions, or require additional support with the tool, please do not hesistate to contact us. For more information on how to contact us, please visit the <Link to='/help/contact-us'>Contact Us</Link> webpage.</p>
    </PageLayout>
  )
}