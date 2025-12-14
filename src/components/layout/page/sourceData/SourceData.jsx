import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from '../../../ui/button/Button';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '../PageLayout';
import CodeBox from '../../../ui/code/CodeBox';
import ContentBox from '../../../ui/content/ContentBox';
import logo from '../../../../assets/stf-logo.png';
import { BASE_URL } from '../../../../settings/EnvironmentVariables';


export default function SourceData() {
  const navigate = useNavigate();
  
    async function fetchData(apiUrl='', fileName='') {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Problem retrieving data from API');
        const result = await response.json();
        if (Array.isArray(result) && result.length === 0) throw new Error('Received API array is empty');
        else {
          const jsonBlob = new Blob([JSON.stringify(result, null, 2)], {
            type: 'application/json',
          });
          const url = URL.createObjectURL(jsonBlob);
          const link = document.createElement('a');
          link.href = url;
          const now = new Date();
          const pad = (num) => String(num).padStart(2, '0');
          const day = pad(now.getDate());
          const month = pad(now.getMonth() + 1);
          const year = now.getFullYear();
          const hours = pad(now.getHours());
          const minutes = pad(now.getMinutes());
          const seconds = pad(now.getSeconds());
          const timestamp = `${day}-${month}-${year}_${hours}-${minutes}-${seconds}`;
          link.download = `${fileName}_${timestamp}.json`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      } 
      catch (error) {
        let filePath = '';
        let fileName = '';
        switch (apiUrl) {
          case `${BASE_URL}/northern_1`:
            filePath = '/assets/Northern-1_25-07-2025_02-54-17.json';
            fileName = 'Northern-1_25-07-2025_02-54-17.json';
            break;
          case `${BASE_URL}/northern_2`:
            filePath = '/assets/Northern-2_25-07-2025_02-54-56.json';
            fileName = 'Northern-2_25-07-2025_02-54-56.json';
            break;
          default:
            filePath = '/assets/Northern-1_25-07-2025_02-54-17.json';
            fileName = 'Northern-1_25-07-2025_02-54-17.json';
            break;
        }
        if (filePath && fileName) {
          const link = document.createElement('a');
          link.href = filePath;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    }

  return (
    <PageLayout title='Source Data'>
      <ContentBox 
        image={<i className="bi bi-database" style={{ fontSize: '80px' }}></i>} 
        imageAlt='Database Icon' 
        caption='Database Data' 
        title='Introduction'
      >
        <p style={{ textAlign: 'left' }}>This sonification and visualisation tool contains many pre-built presentation examples, alongside personalisation and customisation options, to display our captured tree and climate data in your own bespoke way. 
        However, you may wish to have even more flexibility and creative freedom to explore our data for artistic expression or scientific analysis.
        Our provided data can be used to create your own sonifications and visualisations.</p>
        <p style={{ textAlign: 'left' }}>To facilitate this, we provide access to the data in two forms: a <em>web API</em>, and a <em>data download</em>. 
          For most users, we recommended the <em>web API</em>, as this will provide you with the latest, constantly-updated data feed from our hardware tree talker devices. 
          However, the <em>data download</em> offers a simpler-to-use, reliable, offline copy of the data, particularly useful for testing and prototyping purposes.</p>
      </ContentBox>
      <ContentBox
        image={<i className="bi bi-link-45deg" style={{ fontSize: '80px' }}></i>}
        imageAlt='Link'
        caption='Web API Link'
        title='REST Web API'
      >
        <h4 className="fw-normal mt-2">About</h4>
        <p style={{ textAlign: 'left' }}>The data collected from the tree talker devices is provided via a representational state transfer (REST) aplication programming interface (API). The API allows the sensor values received from the hardware devices to be requested and received over the internet, in a format that web clients (i.e. your browser or other software requiring the data) can understand. As with all REST APIs, the API is stateless, meaning each request you make must include all the relevant information for the server to complete the request.</p>
        <p style={{ textAlign: 'left' }}>We recommend the use of the REST API to obtain our tree talker data. The API ensures you will always be provided with the most up-to-date data readings in your receiving application (e.g. web application, Max/MSP or SuperCollider project), as we receive new values from the hardware devices. It also eliminates the requirement to store the data locally on your system, reducing storage space and file management issues. Data is provided via web-based HTTPS requests, with sensor values being returned in JavaScript Object Notation (JSON) format, understood by most applications.</p>
        <p style={{ textAlign: 'left' }}>This section details the usage and basic troubleshooting steps of the web API.</p>
        <h4 className="fw-normal mt-2">Endpoints List</h4>
        <p style={{ textAlign: 'left' }}>All of our API endpoints, used to request the JSON sensor data, are hosted at the following base URL:</p>
        <CodeBox preamble={`GET `} code={`${BASE_URL}`} singleLine />
        <p style={{ textAlign: 'left' }}>A HTTP GET request (used to return data from the API) to the base URL, will return an array, containing the available endpoint paths on the system. Each endpoint path, appended to the base URL (above), will return the data from that respective tree talker device, for instance: <code>{BASE_URL}/northern_1</code> will return the tree talker readings acquired from the Northern 1 device. An example response is listed below:</p>
        <CodeBox code={`{\n "Endpoints":\n    [\n     {\n       "Endpoint":"/northern_1"\n     },\n     {\n       "Endpoint":"/northern_2"\n     }\n    ]\n}`} />
        <h4 className="fw-normal mt-2">Example Use</h4>
        <p style={{ textAlign: 'left' }}>To use the API, first select the desired endpoint. A full list of available endpoints may be found using the process detailed in the previous section. After selecting an endpoint, send a HTTP GET request to the associated endpoint URL. GET requests are sent by web browsers upon entering a URL into the search bar, thus the API data will be returned after directly entering the endpoint URL in a web browser.</p>
        <p style={{ textAlign: 'left' }}>To learn how to send HTTP GET requests in your client software of choice (e.g. web application, Max/MSP or SuperCollider project), please consult your system's user guide or documentation.</p>
        <p style={{ textAlign: 'left' }}>For this example, we will send a HTTP GET request to the Northern 1 device's API endpoint:</p>
        <CodeBox preamble={`GET `} code={`${BASE_URL}/northern_1`} singleLine />
        <p style={{ textAlign: 'left' }}>After sending a HTTP GET request to a device's API endpoint, the API will return a JSON array, containing one JSON object per collective sensor data record.</p>
        <p style={{ textAlign: 'left' }}>Each JSON object record contains the following fields:</p>
        <ul style={{ textAlign: 'left' }}>
          <li><code>timestamp:</code> String - ISO 8601 Format - Date and time of recording all sensor readings from the tree talker device</li>
          <li><code>temperature:</code> Number - Degrees Celcius (&deg;C) - Air temperature surrounding the tree</li>
          <li><code>humidity:</code> Number - Relative Humidity (%) - Air water vapour level, relative to temperature, surrounding the tree</li>
          <li><em><code>soilMoisture:</code> Number - Relative Moisture (%) - Soil moisture level, relative to humidity, of the tree's soil</em></li>
          <li><code>displacement:</code> Number - Micrometer (&micro;m) - Trunk expansion (or contraction) of the tree's trunk </li>
        </ul>
        <p style={{ textAlign: 'left' }}><em>Note: Due to technical issues with the tree talker device's soil moisture sensor hardware, some <code>soilMoisture</code> field values are unfortunately unavailable. Where a field is unavailable, it will be omitted in the returned JSON object.</em></p>
        <p style={{ textAlign: 'left' }}>A JSON array of one object (a single device recording), is presented below:</p>
        <CodeBox code={`[\n {\n   "timestamp": "2025-05-22T02:38:03.000Z",\n   "temperature": 23.09,\n   "humidity": 49.96,\n   "soilMoisture": 1.28,\n   "displacement": 0.36\n }\n]`} />
        <p style={{ textAlign: 'left' }}><em>Note: The API will return JSON objects for all recordings of the specified device, within a JSON array. Searching and filtering for individual records should be performed in your client application. Please be aware that, due to the DIY nature of the hardware installations, specific readings or particular data timestamps may be unavailable.</em></p>
        <h4 className="fw-normal mt-2">Latest Record</h4>
        <p style={{ textAlign: 'left' }}>To retrieve the latest recording from an API endpoint, the endpoint may be appended with the <code>?latest=true</code> query string:</p>
        <CodeBox preamble={`GET `} code={`${BASE_URL}/northern_1?latest=true`} singleLine />
        <p style={{ textAlign: 'left' }}>After sending a HTTP GET request containing the query string to a device's API endpoint, the API will return a single JSON object, containing the latest sensor data record.</p>
        <p style={{ textAlign: 'left' }}>The returned single JSON object record contains the same fields as each returned object in the full record JSON array.</p>
        <p style={{ textAlign: 'left' }}>A single JSON object (a single device recording), is presented below:</p>
        <CodeBox code={`{\n   "timestamp": "2025-05-22T02:38:03.000Z",\n   "temperature": 23.09,\n   "humidity": 49.96,\n   "soilMoisture": 1.28,\n   "displacement": 0.36\n }`} />
        <p style={{ textAlign: 'left' }}><em>Note: Due to technical issues with the tree talker device's soil moisture sensor hardware, some <code>soilMoisture</code> field values are unfortunately unavailable. Where a field is unavailable, it will be omitted in the returned JSON object.</em></p>  
        <h4 className="fw-normal mt-2">Additional Endpoints</h4>
        <p style={{ textAlign: 'left' }}>As listed in the returned JSON array of all available endpoints, a further endpoint, device Northern 2, is available at:</p>
        <CodeBox preamble={`GET `} code={`${BASE_URL}/northern_2`} singleLine />
        <p style={{ textAlign: 'left' }}>The Northern 2 endpoint is requested, and responds, in the same manner as the Northern 1 endpoint, described previously. For this reason, an application written to to interact with the first endpoint can be easily modified to function with the Northern 2 endpoint, or any other additional endpoint, through subsituting the appropriate endpoint path in the base URL. An example response from the Northern 2 endpoint is below:</p>
        <CodeBox code={`[\n {\n   "timestamp": "2025-06-11T09:18:01.000Z",\n   "temperature": 22.09,\n   "humidity": 44.93,\n   "displacement": 39.35\n }\n]`} />
        <p style={{ textAlign: 'left' }}><em>Note: Due to technical issues with the tree talker device's soil moisture sensor hardware, some <code>soilMoisture</code> field values are unfortunately unavailable. Where a field is unavailable, it will be omitted in the returned JSON object, as highlighted in the above response.</em></p>
        <p style={{ textAlign: 'left' }}>As with the Northern 1 endpoint, all additional endpoints may be requested to retrieve their latest recordings, through appending the endpoint with the <code>?latest=true</code> query string:</p>
        <CodeBox preamble={`GET `} code={`${BASE_URL}/northern_2?latest=true`} singleLine />
        <p style={{ textAlign: 'left' }}>The returned single JSON object record contains the same fields as each returned object in the full record JSON array.</p>
        <p style={{ textAlign: 'left' }}>A single JSON object (a single device recording), is presented below:</p>
        <CodeBox code={`{\n   "timestamp": "2025-06-11T09:18:01.000Z",\n   "temperature": 22.09,\n   "humidity": 44.93,\n   "displacement": 39.35\n }`} />
        <p style={{ textAlign: 'left' }}><em>Note: Due to technical issues with the tree talker device's soil moisture sensor hardware, some <code>soilMoisture</code> field values are unfortunately unavailable. Where a field is unavailable, it will be omitted in the returned JSON object.</em></p>
        <h4 className="fw-normal mt-2">Troubleshooting</h4>
        <p style={{ textAlign: 'left' }}>The API should function correctly, and have high reliability. However, if issues are encountered, please note the following fixes:</p>
        {/* Accordion component sourced from: https://getbootstrap.com/docs/5.3/components/accordion/ */}
        <div className="accordion" id="troubleshootingAPI" style={{ minWidth: '100%' }}>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                {`Cannot [POST/PUT/DELETE] /[ROUTE]`}
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#troubleshootingAPI">
              <div className="accordion-body">
                <p style={{ textAlign: 'left' }}>If a response is returned from the endpoint, such as 'Cannot POST /northern_1', please ensure your code is sending only GET requests to the relevant endpoint. The API will only accept GET requests, used to return information, thus all other request types, including POST, PUT, PATCH, and DELETE, are unsupported, and will return this error message.</p>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                {`Cannot GET /[ROUTE]`}
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#troubleshootingAPI">
              <div className="accordion-body">
                <p style={{ textAlign: 'left' }}>If a response is returned from the endpoint, such as 'Cannot GET /north_1', please ensure you are sending requests only to available endpoint paths. If unsure of the correct endpoint path to use, please refer to the 'Endpoints List' section of this page. Incorrect endpoint paths will result in this response being returned.</p>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Missing Endpoint Fields
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#troubleshootingAPI">
              <div className="accordion-body">
                <p style={{ textAlign: 'left' }}>Due to technical issues with the tree talker device's soil moisture sensor hardware, some <code>soilMoisture</code> field values are unfortunately unavailable. Where a field is unavailable, it will be omitted in the returned JSON object.</p>
              </div>
            </div>
          </div>
           <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                Endpoint Timeout/Unreachable
              </button>
            </h2>
            <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#troubleshootingAPI">
              <div className="accordion-body">
                <p style={{ textAlign: 'left' }}>The endpoint is expected to be functional 24/7/365, however there may be occasions where system maintenance, or faults arise, resulting in API downtime. The system should be restored within 48 hours. However, if you are unable to access the API, please do contact us immediately, via email: <a href="mailto:t.f.oflaherty@se24.qmul.ac.uk?subject=%5BSensing%20the%20Forest%20SV%20Tool%5D%20API%20Endpoint%20Failure&body=Dear%20Tug%2C%0A%0AI%20have%20noticed%20that%20the%20API%20endpoints%20are%20not%20functioning%2C%20and%20I%20am%20unable%20to%20access%20the%20data.%0A%0APlease%20can%20you%20look%20into%20this%20as%20soon%20as%20possible%3F">t.f.oflaherty@se24.qmul.ac.uk</a>.</p>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                Further Support
              </button>
            </h2>
            <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#troubleshootingAPI">
              <div className="accordion-body">
                <p style={{ textAlign: 'left' }}>Unfortunately, due to the advanced nature of the endpoints, we are unable to provide additional technical support beyond that expressed on this website. The endpoints are provided with no guarantee, warranty, or liability, and may be subject to future change or downtime. It is expected that users of the endpoint are aware of the complexities associated with using web technologies and APIs within their own applications, alongside possessing sufficient proficiency in their chosen client environment.</p>
                <p style={{ textAlign: 'left' }}>As a given use or implementation of the endpoint may vary, particularly within different client applications, e.g. MAX/MSP or Supercollider, we are unable to offer support on how to integrate the API within such systems. Please refer to online tutorials or your system's user guide or documentation, for further information.</p>
                <p style={{ textAlign: 'left' }}>For further support regarding issues related to the API itself (not queries concerning integration or usage with client applications or environments), please do contact us via email: <a href="mailto:t.f.oflaherty@se24.qmul.ac.uk?subject=%5BSensing%20the%20Forest%20SV%20Tool%5D%20API%20Endpoint%20Issue">t.f.oflaherty@se24.qmul.ac.uk</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </ContentBox>
      <ContentBox
        image={<i className="bi bi-filetype-json" style={{ fontSize: '80px' }}></i>}
        imageAlt='File icon containing the text: JSON'
        caption='JSON File'
        title='Data Download'
        separator={false}
      >
        <h4 className="fw-normal mt-2">About</h4>
        <p style={{ textAlign: 'left' }}>The data collected from the tree talker devices is also provided via a JSON file download link. The JSON files contain the most current sensor values received from the hardware devices, up to the point of file download, in a format that web-enabled clients (i.e. your browser or other software requiring the data) can understand.</p>
        <p style={{ textAlign: 'left' }}>We recommend the use of the REST API to obtain our tree talker data for users unfamiliar with APIs, those who require a static version of the data, or for use without requiring an internet connection. The downloaded file ensures you will always be provided with the same captured readings in your receiving application (e.g. web application, Max/MSP or SuperCollider project), without the updated new values received from the hardware devices, making it particularly useful for demonstrative or development purposes.  Data is provided via downloadable JSON files (.json), with sensor values being returned in JavaScript Object Notation (JSON) format, understood by most applications.</p>
        <p style={{ textAlign: 'left' }}>This section details the usage and basic troubleshooting steps of the JSON file data downloads.</p>
        <h4 className="fw-normal mt-2">Download Links</h4>
        <p style={{ textAlign: 'left' }}>The below download links contain the JSON file data from their associated tree talker devices. The download links automatically update, ensuring the downloaded file contains the most up-to-date data from the tree talkers, at the time of file download.</p>
        <div className='d-flex flex-row justify-content-center align-items-center m-4 w-100'>
          <Button onClick={() => fetchData(`${BASE_URL}/northern_1`, 'Northern-1')}><i className='bi bi-download m-2'></i>Northern 1</Button>
          <Button onClick={() => fetchData(`${BASE_URL}/northern_2`, 'Northern-2')}><i className='bi bi-download m-2'></i>Northern 2</Button>
        </div>
        <h4 className="fw-normal mt-2">Example Use</h4>
        <p style={{ textAlign: 'left' }}>To use the downloadable JSON files, first select the desired device file to download. A full list of available device file download links is provided in the previous section. After selecting a device to download the data from, click the download button to start the JSON file download. The JSON data file should automatically download, saving to your selected Downloads folder in your web browser.</p>
        <p style={{ textAlign: 'left' }}>To learn how to import and use JSON files in your client software of choice (e.g. web application, Max/MSP or SuperCollider project), please consult your system's user guide or documentation.</p>
        <p style={{ textAlign: 'left' }}>For this example, we will download the Northern 1 device's JSON data file.</p>
        <p style={{ textAlign: 'left' }}>After downloading the JSON file containing the Northern 1 device's dataset, the downloaded JSON file, which may be opened in any default text editor (e.g. Notepad on Windows, TextEdit on Mac, or nano on Linux), will consist of a JSON array, containing one JSON object per collective sensor data record.</p>
        <p style={{ textAlign: 'left' }}>Each JSON object record contains the following fields:</p>
        <ul style={{ textAlign: 'left' }}>
          <li><code>timestamp:</code> String - ISO 8601 Format - Date and time of recording all sensor readings from the tree talker device</li>
          <li><code>temperature:</code> Number - Degrees Celcius (&deg;C) - Air temperature surrounding the tree</li>
          <li><code>humidity:</code> Number - Relative Humidity (%) - Air water vapour level, relative to temperature, surrounding the tree</li>
          <li><em><code>soilMoisture:</code> Number - Relative Moisture (%) - Soil moisture level, relative to humidity, of the tree's soil</em></li>
          <li><code>displacement:</code> Number - Micrometer (&micro;m) - Trunk expansion (or contraction) of the tree's trunk </li>
        </ul>
        <p style={{ textAlign: 'left' }}><em>Note: Due to technical issues with the tree talker device's soil moisture sensor hardware, some <code>soilMoisture</code> field values are unfortunately unavailable. Where a field is unavailable, it will be omitted in the JSON object.</em></p>
        <p style={{ textAlign: 'left' }}>A JSON array of one object (a single device recording), is presented below:</p>
        <CodeBox code={`[\n {\n   "timestamp": "2025-05-22T02:38:03.000Z",\n   "temperature": 23.09,\n   "humidity": 49.96,\n   "soilMoisture": 1.28,\n   "displacement": 0.36\n }\n]`} />
        <p style={{ textAlign: 'left' }}><em>Note: The downloaded JSON file dataset will return JSON objects for all recordings of the specified device, within a JSON array. Searching and filtering for individual records should be performed in your client application. Please be aware that, due to the DIY nature of the hardware installations, specific readings or particular data timestamps may be unavailable.</em></p>
        <h4 className="fw-normal mt-2">Troubleshooting</h4>
        <p style={{ textAlign: 'left' }}>The downloadable JSON file links, and file content, should function correctly. However, if issues are encountered, please note the following fixes:</p>
        {/* Accordion component sourced from: https://getbootstrap.com/docs/5.3/components/accordion/ */}
        <div className="accordion" id="troubleshootingDownload" style={{ minWidth: '100%' }}>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                {`Cannot Download File`}
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#troubleshootingDownload">
              <div className="accordion-body">
                <p style={{ textAlign: 'left' }}>If the files are unable to be downloaded, please check your browser's settings, ensuring the browser is enabling popup windows and file downloads for this website, and your browser has sufficient permissions to download files to the specified directory on your system. After ensuring these settings are correct, please retry the file download.</p>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                {`Cannot Locate Downloaded File`}
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#troubleshootingDownload">
              <div className="accordion-body">
                <p style={{ textAlign: 'left' }}>If your file has been successfully downloaded, but you are unable to locate the directory it is stored in, please check the download directory settings used within your browser, and navigate to the directory location stated within the browser's settings. For more information on how to do this within your chosen browser, please refer to the browser's user guide or documentation for more information.</p>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Missing Endpoint Fields
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#troubleshootingDownload">
              <div className="accordion-body">
                <p style={{ textAlign: 'left' }}>Due to technical issues with the tree talker device's soil moisture sensor hardware, some <code>soilMoisture</code> field values are unfortunately unavailable. Where a field is unavailable, it will be omitted in the returned JSON object.</p>
              </div>
            </div>
          </div>
           <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                Downloaded File Corrupted or Blank
              </button>
            </h2>
            <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#troubleshootingDownload">
              <div className="accordion-body">
                <p style={{ textAlign: 'left' }}>The dataset download links are expected to be functional 24/7/365, however there may be occasions where system maintenance, or faults arise, resulting in downtime. In this case, the download links should return a default (past) dataset. If the downloaded file appears blank or corrupted, please check the file encoding settings used by your text editor, and ensure these are set to <code>UTF-8</code>, for correct data display. If you are still unable to access or read the JSON dataset files, please do contact us immediately, via email: <a href="mailto:t.f.oflaherty@se24.qmul.ac.uk?subject=%5BSensing%20the%20Forest%20SV%20Tool%5D%20JSON%20File%20Download%20Links%20Issue&body=Dear%20Tug.%0A%0AThe%20JSON%20file%20download%20links%20are%20not%20working%20correctly.">t.f.oflaherty@se24.qmul.ac.uk</a>.</p>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                Further Support
              </button>
            </h2>
            <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#troubleshootingDownload">
              <div className="accordion-body">
                <p style={{ textAlign: 'left' }}>Unfortunately, due to the nature of the JSON file download links, we are unable to provide additional technical support beyond that expressed on this website. The download links, and their respective files, are provided with no guarantee, warranty, or liability, and may be subject to future change or downtime. It is expected that users of the JSON files are aware of the risks (including, but not limited to viruses, corruption, or other security concerns) and complexities associated with using web technologies and local JSON files within their own applications, alongside possessing sufficient proficiency in their chosen client environment.</p>
                <p style={{ textAlign: 'left' }}>As a given use or implementation of the JSON file dataset may vary, particularly within different client applications, e.g. MAX/MSP or Supercollider, we are unable to offer support on how to integrate the JSON files within such systems. Please refer to online tutorials or your system's user guide or documentation, for further information.</p>
                <p style={{ textAlign: 'left' }}>For further support regarding issues related to the JSON file download links, or JSON files themselves (not queries concerning integration or usage with client applications or environments), please do contact us via email: <a href="mailto:t.f.oflaherty@se24.qmul.ac.uk?subject=%5BSensing%20the%20Forest%20SV%20Tool%5D%20JSON%20File%20Download%20Links%20Issue&body=Dear%20Tug.%0A%0AThe%20JSON%20file%20download%20links%20are%20not%20working%20correctly.">t.f.oflaherty@se24.qmul.ac.uk</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </ContentBox>
    </PageLayout>
  )
}