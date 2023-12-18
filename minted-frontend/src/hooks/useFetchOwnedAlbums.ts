import { useEffect } from 'react';
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

  useEffect(() => {
    owner && dispatch(fetchOwnedAlbumListAsync(owner));

    return () => {
      dispatch(setAlbums([]));
    };
  }, [dispatch, owner]);

  return {
    loading: loadingAlbums,
    data: albums,
  };
};
