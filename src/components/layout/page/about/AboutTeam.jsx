import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from '../../../ui/button/Button';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '../PageLayout';
import ContentBox from '../../../ui/content/ContentBox';
import annaXambo from '../../../../assets/anna-xambo.png';
import georgeXenakis from '../../../../assets/georgios-xenakis.jpg';
import krishnaNamaManjunatha from '../../../../assets/krishna-nama-manjunatha-2.png';
import gerardRoma from '../../../../assets/gerard-roma.jpg';
import mahmoudElmokadem from '../../../../assets/mahmoud-elmokadem.jpg';
import tugOflaherty from '../../../../assets/tug-oflaherty.jpg';


export default function AboutTeam() {
  const navigate = useNavigate();
  return (
    <PageLayout title='About the Team' backLink='about'>
      <div>
        <h2 style={{ textAlign: 'left' }}>Introduction</h2>
        <p style={{ textAlign: 'left' }}>This project, and the wider <em>Sensing the Forest</em> initiative, is run by an interdisciplinary collective, encompassing, but not limited to, visual and sonic artists, software developers, and scientists. It is through the combined expertise of this team, we are able to research innovative new approaches to communicating scientific climate change and tree data in creative ways, such that this information may be more easily interpreted by the general public, and creatives. Although exploring new data presentation modes, including a focus on those incorporating music, our activities and tools are fully guided by scientific work. It is our goal to democratise tree and climate data, to aid its interpretation, with benefits both locally and globally.</p>
        <p style={{ textAlign: 'left' }}>The Sonification and Visualisation Tool team members are detailed below. These encompass engineers, working to design and produce the hardware devices used to capture the sensor data, scientists, providing insights and meaning to the data, and musicians and software developers, investigating new ways to present the given data. A full list of <em>Sensing the Forest</em> team members is available on the <a href="https://sensingtheforest.github.io/about/" target='new'>Sensing the Forest</a> website.</p>
       <h2 style={{ textAlign: 'left', marginTop: '2rem' }}>Team Members</h2>
       <ContentBox 
          image={tugOflaherty} 
          imageAlt="Mr Tug F. O'Flaherty"
          caption="Mr Tug F. O'Flaherty"
          title="Mr Tug F. O'Flaherty"
          subtitle='Software Developer | MSc Student, Queen Mary University of London'
          separator={false}
        >
          <p style={{ textAlign: 'left' }}>Tug F. O’Flaherty is a Sound and Music Computing MSc student at Queen Mary University of London. Having previously undertaken a BSc (Hons) in Computer Science at Kingston University, he specialises in web and cross-platform mobile application development. Tug is excited to be applying his software development background to producing an interactive tool for the sonification and visualisation of climate and tree data within the Sensing the Forest project, under the direction of Dr Anna Xambó. He is passionate about climate change awareness and community-focussed initiatives, and keen to contribute his expertise in data mappings, music, and web development.</p>
          <p style={{ textAlign: 'left' }}>Tug is responsible for the design, development, and maintenance of this tool, including conducting a participatory user study, to establish suitable sonifications and visualisations to present the tree talker data.</p>
        </ContentBox>
        <ContentBox 
          image={mahmoudElmokadem} 
          imageAlt='Mr Mahmoud B. Elmokadem' 
          caption='Mr Mahmoud B. Elmokadem' 
          title='Mr Mahmoud B. Elmokadem'
          subtitle='Hardware Developer | Lecturer, De Montfort University'
        >
          <p style={{ textAlign: 'left' }}>Mahmoud B. Elmokadem is a PhD Researcher and Part-Time Lecturer in Mechatronics Engineering at De Montfort University, Leicester. His research focuses on the development of adaptive acoustic insulation panels designed to control sound with noise frequency adaptation capabilities. Mahmoud has a keen interest in building mechatronic systems and integrating advanced technologies to solve complex engineering problems.</p>
          <p style={{ textAlign: 'left' }}>Mahmoud is responsible for iteratively designing, developing, and supporting the hardware tree talker devices attached to the trees, used to collect and transmit the tree and climate data used within this tool.</p>
        </ContentBox>
        <ContentBox 
          image={krishnaNamaManjunatha} 
          imageAlt='Dr Krishna Nama Manjunatha' 
          caption='Dr Krishna Nama Manjunatha' 
          title='Dr Krishna Nama Manjunatha'
          subtitle='CI | Senior Lecturer, De Montfort University'
        >
          <p style={{ textAlign: 'left' }}>Krishna Nama Manjunatha is a Senior Lecturer in Micro and Nano Electronics at De Montfort University. Krishna is interested in synthesis, development, and characterisation of nanoscale materials and their applications in emerging areas of electronics as well as in the growth of silicon nanostructures and its application in charge storage (memory and Li-Ion batteries) and charge generation (photovoltaics).</p>
          <p style={{ textAlign: 'left' }}>Krishna is responsible for providing engineering insights, and overseeing the design of the hardware tree talker device, ensuring the developed hardware is accurate, reliable, cost-effective, and fit for purpose.</p>
        </ContentBox>
        <ContentBox 
          image={gerardRoma} 
          imageAlt='Dr Gerard Roma' 
          caption='Dr Gerard Roma' 
          title='Dr Gerard Roma'
          subtitle='Advisor | Lecturer, University of West London'
        >
          <p style={{ textAlign: 'left' }}>Gerard Roma has extensive experience in research and development in the field of sound and music computing and is a Technical Advisor of the project. He is also a practitioner in electronic and computer music. His research interests include audio analysis and synthesis, digital musical instruments, intelligent audio processing, audio source separation and environmental sound recognition.</p>
          <p style={{ textAlign: 'left' }}>Gerard contributes significant expertise towards the project, namely in an advisory capacity, and is primarily responsible for developing and maintaining the system used by the hardware devices, in order to transmit their data to a central web server.</p>
        </ContentBox>
        <ContentBox 
          image={georgeXenakis} 
          imageAlt='Dr Georgios (George) Xenakis' 
          caption='Dr Georgios (George) Xenakis' 
          title='Dr Georgios (George) Xenakis'
          subtitle='CI | Senior Scientist, Forest Research'
        >
          <p style={{ textAlign: 'left' }}>Georgios Xenakis’ work focuses on measuring the carbon, water and energy balances of upland Sitka spruce plantations. Using micrometeorological techniques and eco-physiological process-based models, George quantifies the effect forest management has on carbon dynamics. George is also the manager of the Harwood Forest GHG monitoring site. His other research focuses on the drought effect on trees, both on the ecosystem and individual tree scale. George currently leads a manipulation experiment investigating the physiology of young trees during the recovery from drought.</p>
          <p style={{ textAlign: 'left' }}>George is responsible for providing scientific insights into the design of the hardware tree talker device, and the interpretation of the tree and climate data received from the hardware sensors, while ensuring all work conducted within the design and development of this tool is scientifically valid.</p>
        </ContentBox>
       <ContentBox 
          image={annaXambo} 
          imageAlt='Dr Anna Xambó' 
          caption='Dr Anna Xambó'
          title='Dr Anna Xambó'
          subtitle='PI | Senior Lecturer, Queen Mary University of London'
        >
          <p style={{ textAlign: 'left' }}>Anna Xambó is a researcher and musician. Her research and practice focus on building and evaluating interactive music systems for music creation and performance using human-computer interaction research. She is a Senior Lecturer in Sound and Music Computing and a member of the Centre for Digital Music (C4DM) at School of Electronic Engineering and Computer Science (EECS), Queen Mary University of London.</p>
          <p style={{ textAlign: 'left' }}>Anna is responsible for managing, organising, and overseeing the <em>Sensing the Forest</em> initiative, including all work conducted within the design and development of this tool.</p>
        </ContentBox>
      </div>
    </PageLayout>
  )
}