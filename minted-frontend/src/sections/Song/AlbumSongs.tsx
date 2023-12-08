import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SongTable from '@/components/AlbumSong/SongTable';
import LoadingButton from '@/components/LoadingButton';
import {
  Album,
  Song,
  fetchAlbumSongListAsync,
  selectSongs,
  useDispatch,
  useSelector,
} from '@/lib/redux';
import DeleteConfirmModal from '@/components/Modal/DeleteConfirmModal';
import { useAlbumSong } from '@/hooks/useAlbumSong';

type Props = {
  album: Album;
};

const AlbumSongs = ({ album }: Props) => {
  const dispatch = useDispatch();
  const songList = useSelector(selectSongs);
  const { deleteSong } = useAlbumSong(album.contract);
  const [selectedSong, setSelectedSong] = useState<Song>();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchAlbumSongListAsync(album.albumid));
  }, [album]);

  const handleRemoveSong = async (song: Song) => {
    try {
      setIsLoading(true);

      const removedId = await deleteSong(song.albumid, song.songid);
      if (removedId) {
        return toast.info('You have successfully deleted the song');
      }
    } catch (err: any) {
      console.error(err);
      if (err && err.message === 'Cancelled') {
        return toast.error(`Transaction cancelled`);
      }
    } finally {
      setIsLoading(false);
    }

    toast.error('Something went wrong!');
  };

  const handleConfirmDeletion = () => {
    setShowDeleteConfirm(false);
    selectedSong && handleRemoveSong(selectedSong);
  };

  return (
    <>
      <SongTable
        songs={songList}
        actions={(song: Song) => (
          <LoadingButton
            className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen"
            loading={!!(isLoading && selectedSong === song)}
            disabled={!!isLoading}
            onClick={() => {
              setSelectedSong(song);
              setShowDeleteConfirm(true);
            }}
          >
            Remove
          </LoadingButton>
        )}
      />
      <DeleteConfirmModal
        show={showDeleteConfirm}
        title="Delete Album"
        description="Are you sure to delete the album?"
        onConfirm={handleConfirmDeletion}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </>
  );
};

export default AlbumSongs;
