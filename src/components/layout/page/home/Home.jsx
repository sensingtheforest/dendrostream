import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import DashboardButton from '../../../ui/dashboard/DashboardButton';
import DashboardContainer from '../../../ui/dashboard/DashboardContainer';
import PageLayout from '../PageLayout';


export default function Home() {
  return (
    <PageLayout back={false}>
      <div>
        <div className='d-flex justify-content-center align-items-center mb-5 pb-4 gap-5'>
            <i className="bi bi-soundwave" style={{ fontSize: '5rem', color: 'green' }}></i>
            <h1 style={{ color: 'darkgreen' }}>Dendrostream</h1>
        </div>
        <DashboardContainer>
          <DashboardButton image={<i className="bi bi-broadcast-pin" style={{ fontSize: '4em', color: '#1B1B1B' }} />} title='Primary Data' subtitle='(Basic)' link='primary-data' />
          <DashboardButton image={<i className="bi bi-cpu" style={{ fontSize: '4em', color: '#1B1B1B' }} />} title='Derived Data' subtitle='(Basic)' link='derived-data' />
          <DashboardButton image={<i className="bi bi-sliders" style={{ fontSize: '4em', color: '#1B1B1B' }} />} title='Personalised Data' subtitle='(Intermediate)' link='personalised-data' />
          <DashboardButton image={<i className="bi bi-magic" style={{ fontSize: '4em', color: '#1B1B1B' }} />} title='Custom Audio' subtitle='(Intermediate)' link='custom-audio' />
          <DashboardButton image={<i className="bi bi-code-slash" style={{ fontSize: '4em', color: '#1B1B1B' }} />} title='Source Data' subtitle='(Advanced)' link='source-data' />
          <DashboardButton image={<i className="bi bi-info-circle" style={{ fontSize: '4em', color: '#1B1B1B' }} />} title='About' link='about' />
          <DashboardButton image={<i className="bi bi-question-circle" style={{ fontSize: '4em', color: '#1B1B1B' }} />} title='Help' link='help' />
        </DashboardContainer>
      </div>
    </PageLayout>
  )
}