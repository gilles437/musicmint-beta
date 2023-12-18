import { useEffect } from 'react';
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

  useEffect(() => {
    album && dispatch(fetchAlbumSongListAsync(album.albumid));

    return () => {
      dispatch(setSongs([]));
    };
  }, [dispatch, album]);

  return {
    loading: loadingSongs,
    data: songs,
  };
};
