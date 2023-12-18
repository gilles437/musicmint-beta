import { useEffect } from 'react';
import {
  fetchMintedAlbumListAsync,
  selectAlbums,
  setAlbums,
  useDispatch,
  useSelector,
} from '@/lib/redux';

export const useFetchMintedAlbums = (owner: string | null) => {
  const dispatch = useDispatch();
  const { loadingAlbums } = useSelector((state) => state.album);
  const albums = useSelector(selectAlbums);

  useEffect(() => {
    owner && dispatch(fetchMintedAlbumListAsync(owner));

    return () => {
      dispatch(setAlbums([]));
    };
  }, [dispatch, owner]);

  return {
    loading: loadingAlbums,
    data: albums,
  };
};
