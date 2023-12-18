import { useEffect } from 'react';
import { fetchArtistListAsync, selectArtists, useDispatch, useSelector } from '@/lib/redux';

export const useFetchArtists = () => {
  const dispatch = useDispatch();
  const artists = useSelector(selectArtists);

  useEffect(() => {
    dispatch(fetchArtistListAsync());
  }, [dispatch]);

  return {
    loading: false,
    data: artists,
  };
};
