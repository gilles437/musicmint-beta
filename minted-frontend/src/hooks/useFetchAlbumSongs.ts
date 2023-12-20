import { useCallback, useEffect } from 'react';
import {
  Album,
  fetchAlbumSongListAsync,
  selectSongs,
  setSongs,
  useDispatch,
  useSelector,
} from '@/lib/redux';

export const useFetchAlbumSongs = (album?: Album | null) => {
  const dispatch = useDispatch();
  const { loadingSongs } = useSelector((state) => state.album);
  const songs = useSelector(selectSongs);

  const refresh = useCallback(() => {
    if (album) {
      const payload = { owner: album.from, albumId: album.albumid };
      dispatch(fetchAlbumSongListAsync(payload));
    }
  }, [dispatch, album]);

  useEffect(() => {
    refresh();

    return () => {
      dispatch(setSongs([]));
    };
  }, [dispatch, refresh]);

  return {
    data: songs,
    loading: loadingSongs,
    refresh,
  };
};
