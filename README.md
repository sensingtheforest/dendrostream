# Dendrostream Frontend Web Application

## Description

This code is for the Dendrostream frontend web application, used to present the tree and climate data received from the prototype tree talker unit developed as part of Sensing the Forest. This system offers basic and complex mappings of the data received from the hardware units (via the associated [Dendrostream API](https://github.com/sensingtheforest/dendrostream-api)), using sonification (created using the Web Audio API) and visualisation (using d3.js or p5.js) techniques.

This application is available at: [www.dendrostream.com](www.dendrostream.com).

## Features

* Hear the sonification (audio/musical data representation) and view the visualisation (graphical data representation) of the tree-talker units' data
* Discover climate trends, tree stress, and their associations
* Learn more about the trees and the tree-talker hardware devices

## Installation/Deployment

### Hardware/Software Requirements

* Hardware/software meeting the minimum requirements for Node.js (^v20.19.0), React (^19.1.0), and Vite (^7.0.4)
* Developed/tested and working on an Apple Macbook Pro (16-inch/November 2024/M4 Pro/48 GB/Sequoia 15.6) and Cloudflare Pages cloud deployment service (Free tier - free) as of 25/01/2026

### Prerequisites

#### Install Node.js/npm
 * Local installation: [npm Docs: Downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) tutorial for the latest installation instructions for your chosen platform
 * Cloud service installation: refer to your cloud provider for information and support. Services such as [Cloudflare Pages](https://pages.cloudflare.com) already support deployment from this GitHub repository, without manual installation of Node.js/npm.

 **Note:** this tutorial assumes deployment from the master branch of the official source GitHub repository: [sensingtheforest/dendrostream](https://github.com/sensingtheforest/dendrostream).

 #### (Optional) Install/Deploy [Dendrostream API](https://github.com/sensingtheforest/dendrostream-api)
 * Hosted API: the Dendrostream frontend web application is already configured to use the [officially-hosted Dendrostream API](https://stf-sv-tool-api.onrender.com), so no further action is required to use this
 * Local/cloud installation: refer to the [Dendrostream API](https://github.com/sensingtheforest/dendrostream-api) tutorial for the latest installation instructions for your chosen platform

### Setup

#### Local (Development)

1. Clone or download this GitHub repository to your local development machine.

2. Open the project and navigate to the root directory of this cloned project on your local development machine in your code editor/IDE of choice (e.g., VS Code).

3. Ensuring you are currently in the root directory of the cloned project in your terminal (such as in VS Code), type the following command, and then press the Enter key:

```
npm i
```
**Note:** this command may take a few moments to run, and you should see a directory created named `node_modules` within the project's root directory. 

4. (Optional) If a local/cloud installation of the [Dendrostream API](https://github.com/sensingtheforest/dendrostream-api) has been made, and you wish to use this backend API instead of the [officially-hosted version](https://stf-sv-tool-api.onrender.com), within the root project directory of the Dendrostream frontend, navigate to: 
```
dendrostream > src > settings > EnvironmentVariables.jsx
``` 
Update:
```
export const BASE_URL = 'https://stf-sv-tool-api.onrender.com';
export const BASE_SOCKET_URL = 'https://stf-sv-tool-api.onrender.com';
```
with the base URL of your deployed copy of the [Dendrostream API](https://github.com/sensingtheforest/dendrostream-api) (e.g., either `http://localhost:3000` etc., or a public URL).

Example assuming the Dendrostream API is deployed at `https://example.com`:
```
export const BASE_URL = 'https://example.com';
export const BASE_SOCKET_URL = 'https://example.com';
```
**Note:** By default (assuming the [Dendrostream API](https://github.com/sensingtheforest/dendrostream-api) code has not been modified), the API `BASE_URL` and `BASE_SOCKET_URL` will be identical. 

5. Ensuring you are currently in the root directory of the cloned project in your terminal, type the following command, and then press the Enter key:

```
npm run dev
```

6. Your project should now be running at the following URL (displayed in the terminal), which you can navigate to using a browser (default, if available. If in use, will continually increment until it finds the next available port e.g.: `5174`):
```
http://localhost:5173
```

7. The application will now be running, and any errors encountered will be displayed in the terminal.

8. To stop the application running, enter the key command: `ctrl+c` in the terminal.

**Note:** The above instructions allow the system to be run in `Development Mode`, for the purposes of testing, debugging, and editing. To deploy the system, it is advisable to first use `Preview Mode`, to ensure the system will behave correctly once built, before creating a `Production Build`, which will be the final built system that users will interact with. To learn more about how to [Build for Production](https://vite.dev/guide/build) and for [Deploying a Static Site](https://vite.dev/guide/static-deploy), refer to the Vite Documentation (although this process is often performed automatically if using a Remote Cloud Service, as described below).

#### Remote Cloud Service (Deployment)

1. Clone this GitHub repository as a new project, using your remote cloud service, e.g. [Cloudflare Pages](https://pages.cloudflare.com). The service provided should automatically install all project dependencies and build the project, although check with your service provider's documentation for more information.

2. (Optional) If a local/cloud installation of the [Dendrostream API](https://github.com/sensingtheforest/dendrostream-api) has been made, and you wish to use this backend API instead of the [officially-hosted version](https://stf-sv-tool-api.onrender.com), within the root project directory of the Dendrostream frontend, navigate to: 
```
dendrostream > src > settings > EnvironmentVariables.jsx
``` 
Update:
```
export const BASE_URL = 'https://stf-sv-tool-api.onrender.com';
export const BASE_SOCKET_URL = 'https://stf-sv-tool-api.onrender.com';
```
with the base URL of your deployed copy of the [Dendrostream API](https://github.com/sensingtheforest/dendrostream-api) (e.g., either `http://localhost:3000` ***if the deployed API is running on the same server*** etc., or a public URL).

Example assuming the Dendrostream API is deployed at `https://example.com`:
```
export const BASE_URL = 'https://example.com';
export const BASE_SOCKET_URL = 'https://example.com';
```
**Note:** By default (assuming the [Dendrostream API](https://github.com/sensingtheforest/dendrostream-api) code has not been modified), the API `BASE_URL` and `BASE_SOCKET_URL` will be identical. 

3. If necessary, rebuild or restart the project within your remote cloud service.

4. Your project should now be running at the URLs provided by your remote cloud service. **Note:** To find the correct base URLs, refer to your remote cloud service's dashboard.

5. The application will now be running, and any errors encountered will be displayed in the terminal of your remote cloud service. 

6. To stop the application running, enter the key command: `ctrl+c` in the terminal of your cloud service, or press the relevant shut down button. 

**Note:** Some services, such as Cloudflare Pages, will automatically rebuild the project upon a new commit being made to the GitHub repository: please consult the relevant documentation to deactivate this feature, if desired.

## Troubleshooting

Common issues:
* Most local connection issues will be due to CORS problems with the backend API, thus the `cors` package is installed and active by default, within the backend API.
* When deploying to a cloud service, the frontend website will use the URL specified by the service, else a local installation will use the base URL: `http://localhost:5173` (default, if available. If in use, will continually increment until it finds the next available port e.g.: `5174`).
* For remote usage, deploying the frontend web application using a cloud provider is recommended, such as [Cloudflare Pages](https://pages.cloudflare.com). This will provide you with a public URL automatically.
* If deploying with a nested public URL path, you may need to adjust the base path used within the application. For more information, please visit the [Vite Build Guide](https://vite.dev/guide/build).

For further support, please email Tug F. O'Flaherty: [t.f.oflaherty@se24.qmul.ac.uk](mailto:t.f.oflaherty@se24.qmul.ac.uk). 

## Dependencies

The following libraries and tools are required for the Dendrostream frontend web application and additional tasks.

**Note:** Dependencies are automatically installed by the provided installer. No manual installation should be required. 

### System Packages

- [@popperjs/core](https://github.com/floating-ui/floating-ui#readme) - ^v2.11.8 - Positioning engine to ensure tooltips, popovers and dropdowns are placed correctly on-screen
- [bootstrap](https://getbootstrap.com) - ^v5.3.7 - Webpage styling (CSS classes)
- [bootstrap-icons](https://icons.getbootstrap.com) - ^v1.13.1 - Webpage icons
- [bs-stepper](https://github.com/Johann-S/bs-stepper) - ^v1.7.0 - Stepper component used in Custom Audio webpages
- [d3](https://d3js.org) - ^v7.9.0 - Used for creating graph-based visualisations (line graphs and bar charts)
- [p5](https://p5js.org) - ^v2.0.3 - Used for creating animation-based visualisations (live data dials and animated forest scene)
- [react](https://react.dev) - ^v19.1.0 - Used to create the basic website, using a component-based interface
- [react-dom](https://react.dev) - ^v19.1.0 - Used to render the React components within the browser's DOM
- [react-helmet](https://github.com/nfl/react-helmet#readme) - ^v6.1.0 - Used to update webpage title automatically when switching between different webpages
- [react-router-dom](https://github.com/remix-run/react-router#readme) - ^v7.7.0 - Used to route between different webpages, based on the requested URL
- [socket.io-client](https://github.com/socketio/socket.io/tree/main/packages/socket.io-client#readme) - ^v4.8.1 - Used to establish a web socket connection to the backend API, to provide live, realtime updates when new data is received from the tree-talker units

**Note:** these packages are used in the built/deployed system and during system development.

### Development Packages
- [@eslint/js](https://eslint.org) - ^v9.30.1 - Used to provide the ESLint core
- [@types/react](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react) - ^v19.1.8 - Used to provide TypeScript definitions for React
- [@types/react-dom](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-dom) - ^v19.1.6 - Used to provide TypeScript definitions for React DOM
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react#readme) - ^v4.6.0 - Used to add React support to Vite
- [eslint](https://eslint.org) - ^v9.30.1 - Used to find and enforce JavaScript problems and style in the written JavaScript code
- [eslint-plugin-react-hooks](https://react.dev) - ^v5.2.0 - Used to provide ESLint rules to ensure React Hooks are used correctly
- [eslint-plugin-react-refresh](https://github.com/ArnaudBarre/eslint-plugin-react-refresh#readme) - ^v0.4.20 - Used to ensure compatibility with React Fast Refresh
- [globals](https://github.com/sindresorhus/globals#readme) - ^v16.3.0 - Used to provide predefined global variables for JavaScript environments
- [vite](https://vite.dev) - ^v7.0.4 - Used to build the frontend application quickly, and as a development server

**Note:** these packages are used only during system development, and not in the built/deployed system.

### Additional Information and Further Reading

For tutorials and details about hardware and code, visit [Sensing the Forest](https://sensingtheforest.github.io).

The accompanying Master's thesis may be viewed at: [https://doi.org/10.5281/zenodo.17924731](https://doi.org/10.5281/zenodo.17924731).
For academic purposes, this code can be referenced by its associated paper as: 

```
O'Flaherty, T. F., & Xambó Sedó, A. (2025). Dendrostream: Exploring Tree Stress and Climate Change Through Sonification and Visualisation. Zenodo. https://doi.org/10.5281/zenodo.17924731
```

The Dendrostream project has featured in reports including in the:
* [Web Audio Conference 2025](https://doi.org/10.5281/zenodo.17642479)
* [Queen Mary University of London EECS Research Impact Case Study](https://www.qmul.ac.uk/eecs/research/research-impact/case-study-sensing-the-forest/)
* [Sensing the Forest Blog](https://sensingtheforest.github.io/2025/12/23/dendrostream/)

## License

BSD-3-Clause license (see LICENSE file for more information).

## Contribution Guidelines

We welcome contributions to this project that improve the quality, reliability, and functionality of the developed system. As this project is part of an AHRC-funded research programme, with a focus on open-source development, sustainability, and climate change, contributions should align with the project's research aims. As such, contributors should prioritise maintainability, transparency, and reproducibility.

All bug fixes, functionality and/or documentation improvements, and testing are especially encouraged, with contributions being accepted under the BSD-3-Clause license. Contributors should ensure that any submitted code is original, license-compatible, and does not include any sensitive or personal data (e.g., third-party login credentials, API keys etc.).

Contributions may be made through forking this repository on GitHub, and creating your own branch in your fork. You can then open a Pull Request to this repository's `main` branch. Changes will be reviewed and, if relevant and suitable, merged into the `main` branch of this repository, with contribution acknowledgements being made. For more information, please email Tug F. O'Flaherty: [t.f.oflaherty@se24.qmul.ac.uk](mailto:t.f.oflaherty@se24.qmul.ac.uk).

## Credits and Acknowledgements

* **Authors**: 
  - [Tug F. O'Flaherty](https://github.com/thewoe)
Developed the Dendrostream sonification and visualisation tool project.

* **Funders**:

  - [Sensing the Forest](https://sensingtheforest.github.io/) is a project funded by the [UKRI Arts and Humanities Research Council (AHRC)](https://www.ukri.org/councils/ahrc/) (AH/X011585/1, AH/X011585/2).

* **Contributors**:
  - PI and Project Supervisor: [Anna Xambó Sedo](https://github.com/axambo)

* **Acknowledgements**:
  - Original tree-talker unit API (requested by this API): [Gerard Roma](https://github.com/g-roma)
  - Tree-talker unit hardware: [Krishna Nama Manjunatha](https://www.dmu.ac.uk/about-dmu/academic-staff/technology/krishna-nama-manjunatha/krishna-nama-manjunatha.aspx) and [Mahmoud B. Elmokadem](https://www.linkedin.com/in/mahmoud-b-elmokadem-478617174)
  - Scientific ideas and advice: [Georgios Xenakis](https://www.forestresearch.gov.uk/staff/georgios-xenakis/)
  - README Template: [Luigi Marino](https://github.com/luigimarino)

<!-- A huge thanks must be expressed to Anna, for all your help and support during this project! --!>