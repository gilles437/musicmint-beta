import { useEffect } from 'react';
import { fetchAllAlbumsAsync, setAlbums, useDispatch } from '@/lib/redux';

export const useFetchAllAlbums = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllAlbumsAsync());

    return () => {
      dispatch(setAlbums([]));
    }
  }, [dispatch]);
};
