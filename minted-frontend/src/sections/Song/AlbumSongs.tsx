import { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { Album, Song } from '@/lib/redux';
import SongTable from '@/components/AlbumSong/SongTable';
import LoadingButton from '@/components/LoadingButton';
import DeleteConfirmModal from '@/components/Modal/DeleteConfirmModal';

import { useDeleteSong } from '@/hooks/contract/useDeleteSong';
import { useMintSong } from '@/hooks/contract/useMintSong';
import { useFetchAlbumSongs } from '@/hooks/useFetchAlbumSongs';
import { useRemoveSong } from '@/hooks/useRemoveStoreItem';

import { isNotNullOrUndefined } from '@/utils/utils';

type Props = {
  album: Album;
  editable?: boolean;
};

const AlbumSongs = ({ album, editable }: Props) => {
  const { data: songList, refresh } = useFetchAlbumSongs(album);
  const deleteSong = useDeleteSong();
  const mintSong = useMintSong();
  const removeStoreSong = useRemoveSong();

  const [selectedSong, setSelectedSong] = useState<Song>();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { query } = useRouter();
  const minted = useMemo(() => {
    if (query?.minted) {
      return query?.minted as string;
    }
    return null;
  }, [query?.minted]);

  const handleRemoveSong = async (song: Song) => {
    try {
      setIsLoading(true);

      const removedId = await deleteSong(song.contract, song.albumid, song.songid);
      console.log('DeleteSong', removedId);

      if (isNotNullOrUndefined(removedId)) {
        removeStoreSong(song);
        // refresh();
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

  const handleMintSong = useCallback(
    async (song: Song) => {
      console.log('handleMintSong', song);
      try {
        setIsLoading(true);
        setSelectedSong(song);

        const mintedId = await mintSong(song.contract, song.albumid, song.songid, song.price);
        if (mintedId) {
          toast.info('You have successfully minted the song');
          return true;
        }
      } catch (err: any) {
        if (err && err.message === 'Cancelled') {
          toast.error(`Transaction cancelled`);
          return false;
        }
        if (err && typeof err === 'string') {
          toast.error(err);
          return false;
        }
      } finally {
        setIsLoading(false);
      }

      toast.error(`Something went wrong`);
      return false;
    },
    [mintSong]
  );

  /*const actionButtons = (song: Song) => (
    <>
      {walletAddress === album.from ? (
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
      ) : (
        <LoadingButton
          className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen"
          loading={!!(isLoading && selectedSong === song)}
          disabled={!!isLoading}
          onClick={() => handleMintSong(song)}
        >
          Buy
        </LoadingButton>
      )}
    </>
  );*/

  const actionButtons = (song: Song) => {
    if (editable) {
      return (
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
      );
    }

    return (
      <>
        {!minted && (
          <LoadingButton
            className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen"
            loading={!!(isLoading && selectedSong === song)}
            disabled={!!isLoading}
            onClick={() => handleMintSong(song)}
          >
            Buy
          </LoadingButton>
        )}
      </>
    );
  };

  return (
    <>
      <SongTable songs={songList} actions={actionButtons} />
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
