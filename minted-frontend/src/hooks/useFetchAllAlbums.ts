import { useEffect } from 'react';
import {
  fetchAllAlbumsAsync,
  selectAlbums,
  setAlbums,
  useDispatch,
  useSelector,
} from '@/lib/redux';

export const useFetchAllAlbums = () => {
  const dispatch = useDispatch();
  const { loadingAlbums } = useSelector((state) => state.album);
  const albums = useSelector(selectAlbums);

  useEffect(() => {
    dispatch(fetchAllAlbumsAsync());

    return () => {
      dispatch(setAlbums([]));
    };
  }, [dispatch]);

  return {
    data: albums,
    loading: loadingAlbums,
  };
};
