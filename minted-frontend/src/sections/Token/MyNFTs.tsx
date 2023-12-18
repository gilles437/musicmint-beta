import { useState } from 'react';
import { toast } from 'react-toastify';

import { Album } from '@/lib/redux';
import { useWallets } from '@/contexts/Wallets';

import AlbumTable from '@/components/Album/AlbumTable';
import SongTable from '@/components/AlbumSong/SongTable';
import DeleteConfirmModal from '@/components/Modal/DeleteConfirmModal';

import { useAlbum } from '@/hooks/useAlbum';
import { useFetchMintedAlbums } from '@/hooks/useFetchMintedAlbums';
import { useFetchMintedSongs } from '@/hooks/useFetchMintedSongs';

const MyNFTs = () => {
  const { walletAddress } = useWallets();
  const { data: mintedAlbums, loading: isLoadingAlbums } = useFetchMintedAlbums(walletAddress);
  const { data: mintedSongs, loading: isLoadingSongs } = useFetchMintedSongs(walletAddress);
  const { deleteAlbum } = useAlbum();

  const [selectedAlbum, setSelectedAlbum] = useState<Album>();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleDeleteAlbum = async (album: Album) => {
    try {
      setLoading(true);

      const deletedAlbumId = await deleteAlbum(album.albumid, album.contract);
      if (deletedAlbumId) {
        return toast.info('You have successfully deleted your album');
      }
    } catch (err: any) {
      console.error(err);
      if (err && err.message === 'Cancelled') {
        return toast.error(`Transaction cancelled`);
      }
    } finally {
      setLoading(false);
    }
    toast.error('Something went wrong!');
  };

  const handleConfirmDeletion = () => {
    setShowDeleteConfirm(false);
    selectedAlbum && handleDeleteAlbum(selectedAlbum);
  };

  return (
    <>
      <div className="text-center mb-3">
        <h2>My Albums</h2>
      </div>
      <div className="mb-5">
        {/* {!!artist && (
          <Link
            className="d-flex"
            href={{
              pathname: `/album/create`,
              query: { contract: artist.contract },
            }}
          >
            <button className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen">
              Create Album
            </button>
          </Link>
        )} */}
        <div className="col-sm-12">
          <AlbumTable albums={mintedAlbums} loading={isLoadingAlbums} clickable />
        </div>

        <div className="text-center mt-3 mb-3">
          <h2>My Songs</h2>
        </div>
        <div className="col-sm-12">
          <SongTable songs={mintedSongs} loading={isLoadingSongs} />
        </div>
      </div>
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

export default MyNFTs;
