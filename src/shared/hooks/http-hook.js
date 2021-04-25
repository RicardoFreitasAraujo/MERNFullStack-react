import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
    
    const [isLoading, setIsLoading]  = useState(false);
    const [error, setError] = useState();

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers={}) => {
        setIsLoading(true);
        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);
        try
        {
            const response = await fetch(url,{
                method: method,
                body: body,
                headers: headers,
                signal: httpAbortCtrl.signal
            });
    
            const responseData = await response.json();
            activeHttpRequests.current = activeHttpRequests.current.filter(
                reqCtrl => reqCtrl !== httpAbortCtrl
            ); 
            
            if (!response.ok) {
                setError(responseData.message);
                throw new Error(responseData.message);
            }

            setIsLoading(false);
            return responseData;
        } 
        catch(err)
        {
            setIsLoading(false);
            setError(err.message);
            throw err;
        }

        setIsLoading(false);

    }, []);

    const clearError = () => {
        setError(null);
    }

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, [])

    return { 
        isLoading: isLoading,
        error: error,
        sendRequest,
        clearError
    };

};