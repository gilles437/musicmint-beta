import { useEffect, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import {
  useSelector,
  useDispatch,
  selectAlbums,
  fetchOwnedAlbumListAsync,
  fetchArtistListAsync,
  Album,
} from '@/lib/redux';
import AlbumTable from '@/components/Album/AlbumTable';
import { useAlbum } from '@/hooks/useAlbum';
import { useFindArtist } from '@/hooks/useFindArtist';
import { getActiveAccount } from '@/utils/account';
import DeleteConfirmModal from '@/components/Modal/DeleteConfirmModal';
import LoadingButton from '@/components/LoadingButton';

const Album = () => {
  const dispatch = useDispatch();
  const albums = useSelector(selectAlbums);
  const artist = useFindArtist();
  const { deleteAlbum } = useAlbum();
  const [selectedAlbum, setSelectedAlbum] = useState<Album>();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoading, setLoading] = useState(false);
  console.log('showDeleteConfirm', showDeleteConfirm)

  const fetchAlbumList = useCallback(
    (owner: string) => {
      dispatch(fetchOwnedAlbumListAsync(owner));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchArtistListAsync());

    const account = getActiveAccount();
    fetchAlbumList(account);
  }, [dispatch, fetchAlbumList]);

  const handleDeleteAlbum = async (album: Album) => {
    try {
      setLoading(true);

      const success = await deleteAlbum(album.albumid, album.contract, (albumId) => {
        toast.info('You have successfully deleted your album');
        setLoading(false);
      });
      if (!success) {
        setLoading(false);
        toast.error('Failed to delete album');
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error('Something went wrong!');
    }
  };

  return (
    <section className="projects section-padding style-12">
      <div className="container">
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
            <AlbumTable
              albums={albums}
              actions={(album: Album) => (
                <>
                  <Link href={`/album/edit?contract=${album.contract}&albumId=${album.albumid}`}>
                    <Button variant="success" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <LoadingButton
                    variant="danger"
                    style={{ marginLeft: '12px' }}
                    loading={!!isLoading}
                    onClick={() => {
                      setSelectedAlbum(album);
                      setShowDeleteConfirm(true);
                    }}
                  >
                    Delete
                  </LoadingButton>
                </>
              )}
            />
          </div>
        </div>
        <DeleteConfirmModal
          show={showDeleteConfirm}
          title="Delete Album"
          description="Are you sure to delete the album?"
          onConfirm={() => selectedAlbum && handleDeleteAlbum(selectedAlbum)}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      </div>
    </section>
  );
};

export default Album;
