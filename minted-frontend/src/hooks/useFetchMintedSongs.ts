import { useEffect } from 'react';
import {
  fetchMintedSongListAsync,
  selectSongs,
  setSongs,
  useDispatch,
  useSelector,
} from '@/lib/redux';

export const useFetchMintedSongs = (owner: string | null) => {
  const dispatch = useDispatch();
  const { loadingSongs } = useSelector((state) => state.album);
  const songs = useSelector(selectSongs);

  useEffect(() => {
    owner && dispatch(fetchMintedSongListAsync(owner));

    return () => {
      dispatch(setSongs([]));
    };
  }, [dispatch, owner]);

  return {
    loading: loadingSongs,
    data: songs,
  };
};
