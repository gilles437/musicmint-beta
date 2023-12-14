import { useEffect } from 'react';
import { fetchAllAlbumsAsync, useDispatch } from '@/lib/redux';

export const useFetchAllAlbums = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllAlbumsAsync());
  }, [dispatch]);
};
