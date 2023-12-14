import { useEffect } from 'react';
import { fetchOwnedAlbumListAsync, useDispatch } from '@/lib/redux';

export const useFetchOwnedAlbums = (owner: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    owner && dispatch(fetchOwnedAlbumListAsync(owner));
  }, [dispatch, owner]);
};
