import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import DashboardButton from '../../../ui/dashboard/DashboardButton';
import DashboardContainer from '../../../ui/dashboard/DashboardContainer';
import PageLayout from '../PageLayout';


export default function DerivedDataMenu() {
  return (
    <PageLayout title='Derived Data Explorer'>
      <div style={{  }}>
        <DashboardContainer>
          <DashboardButton image={<div className='d-flex gap-5'><i className="bi bi-graph-up-arrow" style={{ fontSize: '4em', color: '#1B1B1B' }} /><i className="bi bi-flask-fill" style={{ fontSize: '4em', color: '#1B1B1B' }} /></div>} title='Preset 1' subtitle='Line Graph with VPD | Drone Sounds' link='derived-data/preset-1' />
          <DashboardButton image={<div className='d-flex gap-5'><i className="bi bi-border-all" style={{ fontSize: '4em', color: '#1B1B1B' }} /><i className="bi bi-flask-fill" style={{ fontSize: '4em', color: '#1B1B1B' }} /></div>} title='Preset 2' subtitle='Tiled Line Graphs with VPD | Drone Sounds' link='derived-data/preset-2' />
          <DashboardButton image={<div className='d-flex gap-5'><i className="bi bi-bar-chart-fill" style={{ fontSize: '4em', color: '#1B1B1B' }} /><i className="bi bi-leaf-fill" style={{ fontSize: '4em', color: '#1B1B1B' }} /></div>} title='Preset 3' subtitle='Daily Averaged Bar Chart with Tree Growth | FM Synthesis Tones' link='derived-data/preset-3' />
          <DashboardButton image={<div className='d-flex gap-5'><i className="bi bi-speedometer" style={{ fontSize: '4em', color: '#1B1B1B' }} /><i className="bi bi-music-note" style={{ fontSize: '4em', color: '#1B1B1B' }} /></div>} title='Preset 4' subtitle='Live Data Dials with VPD | Instrument Ensemble' link='derived-data/preset-4' />
          <DashboardButton image={<div className='d-flex gap-5'><i className="bi bi-film" style={{ fontSize: '4em', color: '#1B1B1B' }} /><i className="bi bi-music-note-beamed" style={{ fontSize: '4em', color: '#1B1B1B' }} /></div>} title='Preset 5' subtitle='Animation with VPD | Music with Ambient Sounds' link='derived-data/preset-5' />
          <DashboardButton image={<i className="bi bi-question-circle" style={{ fontSize: '4em', color: '#1B1B1B' }} />} title='Help' link='help/derived-data' />
        </DashboardContainer>
      </div>
    </PageLayout>
  )
}