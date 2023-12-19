import { useCallback, useEffect } from 'react';
import {
  fetchOwnedAlbumListAsync,
  selectAlbums,
  setAlbums,
  useDispatch,
  useSelector,
} from '@/lib/redux';

export const useFetchOwnedAlbums = (owner?: string | null) => {
  const dispatch = useDispatch();
  const { loadingAlbums } = useSelector((state) => state.album);
  const albums = useSelector(selectAlbums);

  const refresh = useCallback(() => {
    owner && dispatch(fetchOwnedAlbumListAsync(owner));
  }, [dispatch, owner]);

  useEffect(() => {
    refresh();

    return () => {
      dispatch(setAlbums([]));
    };
  }, [dispatch, refresh]);

  return {
    data: albums,
    loading: loadingAlbums,    
    refresh,
  };
};
