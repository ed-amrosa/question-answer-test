import { useState, useEffect } from 'react';

const useInfiniteScroller = (loadItems) => {
  const [fetching, setFetching] = useState(false);

  const handleScroll = () => {
    console.log(window.innerHeight, Math.floor(document.documentElement.scrollTop), document.documentElement.offsetHeight);
    if (window.innerHeight + Math.floor(document.documentElement.scrollTop) === document.documentElement.offsetHeight - 1)
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
    console.log("YOOO");
    loadItems();

  }, [fetching]);

  return [fetching, setFetching];
};

export default useInfiniteScroller;