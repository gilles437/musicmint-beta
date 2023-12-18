import { useEffect } from 'react';
import { fetchOwnedAlbumListAsync, useDispatch, useSelector } from '@/lib/redux';

export const useFetchOwnedAlbums = (owner: string) => {
  const dispatch = useDispatch();
  const { loadingAlbums } = useSelector(state => state.album);

  useEffect(() => {
    owner && dispatch(fetchOwnedAlbumListAsync(owner));
  }, [dispatch, owner]);

  return loadingAlbums;
};
