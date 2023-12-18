import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, Album } from '@/lib/redux';
import { useWallets } from '@/contexts/Wallets';

import AlbumTable from '@/components/Album/AlbumTable';
import DeleteConfirmModal from '@/components/Modal/DeleteConfirmModal';
import LoadingButton from '@/components/LoadingButton';

import { useAlbum } from '@/hooks/useAlbum';
import { useFindArtist } from '@/hooks/useFindArtist';
import { useFetchOwnedAlbums } from '@/hooks/useFetchOwnedAlbums';
import Loader from '@/components/Loader';

const MyAlbums = () => {
  const router = useRouter();

  const artist = useFindArtist();
  const { walletAddress } = useWallets();
  const { data: albums, loading: isLoadingAlbums } = useFetchOwnedAlbums(walletAddress);
  const { deleteAlbum } = useAlbum();

  const [selectedAlbum, setSelectedAlbum] = useState<Album>();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleDeleteAlbum = async (album: Album) => {
    try {
      setLoading(true);
      const deletedAlbumId = await deleteAlbum(album.albumid, album.contract);
      console.log('deletedAlbumId', deletedAlbumId);

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
        {!!artist && (
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
        )}
        <div className="col-sm-12">
          {isLoadingAlbums ? (
            <Loader />
          ) : (
            <AlbumTable
              albums={albums}
              clickable={false}
              actions={(album: Album) => (
                <>
                  <Button
                    variant="link"
                    className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      router.push(
                        `/album/edit?contract=${album.contract}&albumId=${album.albumid}`
                      );
                    }}
                  >
                    Edit
                  </Button>
                  <LoadingButton
                    loading={!!(isLoading && album == selectedAlbum)}
                    disabled={isLoading}
                    className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen"
                    style={{ marginLeft: '12px' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setSelectedAlbum(album);
                      setShowDeleteConfirm(true);
                    }}
                  >
                    Delete
                  </LoadingButton>
                </>
              )}
            />
          )}
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

export default MyAlbums;
