// EndpointContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const GLOBAL_PASSWORD = 'sensingtheforest';

const protectedEndpoints = {
  northern_3: 'sensing',
  northern_4: 'the',
  northern_5: 'forest',
  northern_6: 'visualisation',
  northern_7: 'tool',
};

const allEndpoints = [
  { value: 'northern_1', title: 'Northern 1' },
  { value: 'northern_2', title: 'Northern 2' },
  { value: 'northern_3', title: 'Northern 3' },
  { value: 'northern_4', title: 'Northern 4' },
  { value: 'northern_5', title: 'Northern 5' },
  { value: 'northern_6', title: 'Northern 6' },
  { value: 'northern_7', title: 'Northern 7' },
];

const baseEndpoints = allEndpoints.slice(0, 2); // Always available
const SESSION_KEY = 'unlockedEndpoints';

const EndpointContext = createContext([]);

export const useEndpoints = () => useContext(EndpointContext);

export const EndpointProvider = ({ children }) => {
  const location = useLocation();
  const [endpointsToReturn, setEndpointsToReturn] = useState(baseEndpoints);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const endpointParam = queryParams.get('endpoint');
    const globalPassword = queryParams.get('password');

    // Load existing unlocked endpoints from sessionStorage
    let stored = sessionStorage.getItem(SESSION_KEY);
    let currentEndpoints = baseEndpoints.map((b) => b.value); // always include base
    let unlocked = [...baseEndpoints];

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          parsed.forEach((value) => {
            const ep = allEndpoints.find((e) => e.value === value);
            if (ep && !currentEndpoints.includes(ep.value)) {
              unlocked.push(ep);
              currentEndpoints.push(ep.value);
            }
          });
        }
      } catch (err) {
        console.warn('Failed to parse sessionStorage:', err);
      }
    }

    const addEndpointById = (endpointId) => {
      const ep = allEndpoints.find((e) => e.value === endpointId);
      if (ep && !currentEndpoints.includes(ep.value)) {
        unlocked.push(ep);
        currentEndpoints.push(ep.value);
      }
    };

    // Check if global access is requested and correct
    if (endpointParam === 'all') {
      if (globalPassword === GLOBAL_PASSWORD) {
        unlocked = [...allEndpoints];
        currentEndpoints = allEndpoints.map((e) => e.value);
      }
    }

    // Check individual protected endpoint access
    else if (protectedEndpoints.hasOwnProperty(endpointParam)) {
      const providedPassword = queryParams.get(`${endpointParam}_pass`);
      if (providedPassword === protectedEndpoints[endpointParam]) {
        addEndpointById(endpointParam);
      }
    }

    // Save updated list to sessionStorage
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(currentEndpoints));
    setEndpointsToReturn(unlocked);
  }, [location.search]);

  return (
    <EndpointContext.Provider value={endpointsToReturn}>
      {children}
    </EndpointContext.Provider>
  );
};
