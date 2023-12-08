import { useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import {
  useSelector,
  useDispatch,
  selectAlbums,
  fetchOwnedAlbumListAsync,
  fetchArtistListAsync,
  Album,
} from '@/lib/redux';
import { useAlbum } from '@/hooks/useAlbum';
import { useFindArtist } from '@/hooks/useFindArtist';
import { getActiveAccount } from '@/utils/account';
import AlbumTable from '@/components/Album/AlbumTable';

const Album = () => {
  const dispatch = useDispatch();
  const albums = useSelector(selectAlbums);
  const artist = useFindArtist();
  const { deleteAlbum } = useAlbum();

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
    console.log('handleDeleteAlbum', album);
    try {
      const success = await deleteAlbum(album.albumid, album.contract, (albumId) => {
        toast.info('You have successfully deleted your album');
      });
      if (!success) {
        toast.error('Failed to delete album');
      }
    } catch (error) {
      console.error(error);
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
                    <button className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen">
                      Edit
                    </button>
                  </Link>
                  <button
                    className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-red1"
                    onClick={() => handleDeleteAlbum(album)}
                  >
                    Delete
                  </button>
                </>
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Album;
