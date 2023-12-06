import SongTable from '@/components/AlbumSong/SongTable';
import {
  Album,
  fetchAlbumSongListAsync,
  selectSongs,
  useDispatch,
  useSelector,
} from '@/lib/redux';
import { useEffect } from 'react';

type Props = {
  album: Album;
};

const AlbumSongs = ({ album }: Props) => {
  const dispatch = useDispatch();
  const songList = useSelector(selectSongs);

  useEffect(() => {
    dispatch(fetchAlbumSongListAsync(album.albumid));
  }, [album]);

  return <SongTable songs={songList} />;
};

export default AlbumSongs;
