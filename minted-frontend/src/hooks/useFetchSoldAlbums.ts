import { useEffect } from 'react';
import {
  fetchSoldAlbumListAsync,
  selectSoldAlbums,
  setSoldAlbums,
  useDispatch,
  useSelector,
} from '@/lib/redux';

export const useFetchSoldAlbums = (owner: string | null) => {
  const dispatch = useDispatch();
  const { loadingSoldAlbums } = useSelector((state) => state.album);
  const albums = useSelector(selectSoldAlbums);

  useEffect(() => {
    owner && dispatch(fetchSoldAlbumListAsync(owner));

    return () => {
      dispatch(setSoldAlbums([]));
    };
  }, [dispatch, owner]);

  return {
    loading: loadingSoldAlbums,
    data: albums,
  };
};
