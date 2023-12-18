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
    if (album) {
      const payload = { contract: album.contract, albumId: album.albumid };
      dispatch(fetchAlbumSongListAsync(payload));
    }

    return () => {
      dispatch(setSongs([]));
    };
  }, [dispatch, album]);

  return {
    loading: loadingSongs,
    data: songs,
  };
};
