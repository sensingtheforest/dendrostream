import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import PageLayout from '../../PageLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import AboutPersonalisedData from './AboutPersonalisedData';
import PersonalisedDataHelp from './PersonalisedDataHelp';

export default function HelpPersonalisedData() {
  const navigate = useNavigate();
  return (
    <PageLayout title='Personalised Data Help' backLink='help'>
      <div>
        <h2>Data Information</h2>
        <AboutPersonalisedData />
        <div style={{ height: '2rem' }}></div>
        <h2>Help Guide</h2>
        <PersonalisedDataHelp helpNavigate={() => navigate('/help/contact-us')}/>
      </div>
    </PageLayout>
  )
}