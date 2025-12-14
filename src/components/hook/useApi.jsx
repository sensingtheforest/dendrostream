import { useState, useEffect, useCallback } from 'react';
import { BASE_URL } from '../../settings/EnvironmentVariables';


function useApi() {
    // State ---------------------------------------
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    // Methods -------------------------------------
    const fetchData = useCallback(async (apiUrl='') => {
        setLoading(true);
        try {
            const apiResponse = await fetch(apiUrl);
            if (!apiResponse.ok) throw new Error('Problem retrieving data from API');
            const apiResult = await apiResponse.json();
            const apiParsedResult = apiResult.map(item => ({
                ...item,
                timestamp: new Date(item.timestamp)
            }));
            if (Array.isArray(apiParsedResult) && apiParsedResult.length === 0) throw new Error('Received API array is empty');
            else setResponse(apiParsedResult);
        } 
        catch (error) {
            let filePath = '';
            switch (apiUrl) {
                case `${BASE_URL}/northern_1`:
                    filePath = '/assets/Northern-1_25-07-2025_02-54-17.json';
                    break;
                case `${BASE_URL}/northern_2`:
                    filePath = '/assets/Northern-2_25-07-2025_02-54-56.json';
                    break;
                case `${BASE_URL}/northern_3`:
                    filePath = '/assets/Northern-3_06-08-2025_00-16-12.json';
                    break;
                case `${BASE_URL}/northern_4`:
                    filePath = '/assets/Northern-4_06-08-2025_00-16-56.json';
                    break;
                case `${BASE_URL}/northern_5`:
                    filePath = '/assets/Northern-5_06-08-2025_00-17-10.json';
                    break;
                case `${BASE_URL}/northern_6`:
                    filePath = '/assets/Northern-6_06-08-2025_00-17-34.json';
                    break;
                case `${BASE_URL}/northern_7`:
                    filePath = '/assets/Northern-7_06-08-2025_00-17-52.json';
                    break;
                default:
                    filePath = '/assets/Northern-1_25-07-2025_02-54-17.json';
                    break;
            }
            if (filePath) {
                try {
                    const fileResponse = await fetch(filePath);
                    if (!fileResponse.ok) throw new Error('Problem loading local data file');
                    const fileResult = await fileResponse.json();
                    const fileParsedResult = fileResult.map(item => ({
                        ...item,
                        timestamp: new Date(item.timestamp)
                    }));
                    if (Array.isArray(fileParsedResult) && fileParsedResult.length === 0) throw new Error('Received API array is empty');
                    else setResponse(fileParsedResult);
                }
                catch {
                    setResponse([]);
                }
            }
        }
        finally {
            setLoading(false);
        }
    }, []);

    // Return --------------------------------------
    return { response, loading, fetchData };
}

export default useApi;