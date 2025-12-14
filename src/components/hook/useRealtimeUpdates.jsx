import { useState, useEffect, useRef } from 'react';
import useApi from './useApi';
import useSocketApi from './useSocketApi';
import { BASE_URL } from '../../settings/EnvironmentVariables';

const useRealtimeUpdates = ({ apiUrl = 'northern_1', socketPort = 3001, socketName = 'northern-1' }) => {
  const [data, setData] = useState([]);
  const record = useSocketApi({ socketPort, socketName });
  const { response, loading, fetchData } = useApi();
  const apiLoadedRef = useRef(false);
  useEffect(() => {
    fetchData(`${BASE_URL}/${apiUrl}`);
  }, [apiUrl]);
  useEffect(() => {
    if (response && Array.isArray(response)) {
      setData(response);
      apiLoadedRef.current = true;
    }
  }, [response]);
  useEffect(() => {
    if (!record || !apiLoadedRef.current) return;

    setData(prevData => {
      const exists = prevData.some(item => item?.timestamp === record?.timestamp);
      return exists ? prevData : [...prevData, record];
    });
  }, [record]);

  return { data, loading };
};

export default useRealtimeUpdates;
