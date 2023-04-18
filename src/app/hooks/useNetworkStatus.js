import { useEffect, useState } from 'react';

//detects if user is connected to the internet
const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function handleNetworkChange() {
      setIsOnline(navigator.onLine);
    }

    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);

    return () => {
      window.removeEventListener('online', handleNetworkChange);
      window.removeEventListener('offline', handleNetworkChange);
    };
  }, []);

  return isOnline;
}

export default useNetworkStatus;





