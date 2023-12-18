import { useEffect } from 'react';
import { fetchMintedSongListAsync, selectSongs, useDispatch, useSelector } from '@/lib/redux';

export const useFetchMintedSongs = (owner: string | null) => {
  const dispatch = useDispatch();
  const { loadingSongs } = useSelector((state) => state.album);
  const songs = useSelector(selectSongs);

  useEffect(() => {
    owner && dispatch(fetchMintedSongListAsync(owner));
  }, [dispatch, owner]);

  return {
    loading: loadingSongs,
    data: songs,
  };
};
