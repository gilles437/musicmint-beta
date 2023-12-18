import { useEffect } from 'react';
import { fetchOwnedAlbumListAsync, selectAlbums, useDispatch, useSelector } from '@/lib/redux';

export const useFetchOwnedAlbums = (owner?: string | null) => {
  const dispatch = useDispatch();
  const { loadingAlbums } = useSelector((state) => state.album);
  const albums = useSelector(selectAlbums);

  useEffect(() => {
    owner && dispatch(fetchOwnedAlbumListAsync(owner));
  }, [dispatch, owner]);

  return {
    loading: loadingAlbums,
    data: albums,
  };
};
