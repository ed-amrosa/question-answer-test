import { useState, useEffect } from 'react';

const useInfiniteScroller = (loadItems) => {
  const [fetching, setFetching] = useState(false);

  const handleScroll = () => {
    if (window.innerHeight + Math.floor(document.documentElement.scrollTop) === document.documentElement.offsetHeight)
    {
      setFetching(true);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!fetching) return;
    loadItems();

  }, [fetching]);

  return [fetching, setFetching];
};

export default useInfiniteScroller;