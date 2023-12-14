import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Routes from '@/constants/routes';
import {
  useSelector,
  useDispatch,
  selectAlbums,
  fetchAllAlbumsAsync,
  fetchArtistListAsync,
  Album,
} from '@/lib/redux';
import { useFindArtist } from '@/hooks/useFindArtist';
import { useAlbum } from '@/hooks/useAlbum';
import { getActiveAccount } from '@/utils/account';
import AlbumTable from '@/components/Album/AlbumTable';
import LoadingButton from '@/components/LoadingButton';

const AllAlbums = () => {
  const dispatch = useDispatch();
  const albums = useSelector(selectAlbums);
  const artist = useFindArtist();
  const { mintAlbum } = useAlbum();
  const [selectedAlbum, setSelectedAlbum] = useState<Album>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchAlbumList = useCallback(() => {
    dispatch(fetchAllAlbumsAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchArtistListAsync());
    fetchAlbumList();
  }, [dispatch, fetchAlbumList]);

  const handleBuyAlbum = async (album: Album) => {
    console.log('handleBuyAlbum', album);
    try {
      setIsLoading(true);
      setSelectedAlbum(album);

      const mintedId = await mintAlbum(album.albumid, album.price, album.contract);
      if (mintedId) {
        return toast.info('You have successfully minted the album');
      }
    } catch (err: any) {
      if (err && err.message === 'Cancelled') {
        toast.error(`Transaction cancelled`);
        return false;
      }
    } finally {
      setIsLoading(false);
    }

    toast.error(`Something went wrong`);
    return false;
  };

  return (
    <section className="projects section-padding style-12">
      <div className="container">
        <div className="text-center mb-3">
          <h2>All Albums</h2>
        </div>
        <div className="mb-5">
          {/* {!!artist && (
            <Link className="d-flex" href={Routes.ALBUM_OWNED}>
              <button className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen">
                My Albums
              </button>
            </Link>
          )} */}
          <div className="col-sm-12">
            <AlbumTable
              albums={albums}
              showOwner={true}
              actions={(album: Album) => {
                const activeAccount = getActiveAccount();
                if (activeAccount === album.from) {
                  return <></>;
                }

                return (
                  <LoadingButton
                    loading={!!(isLoading && album == selectedAlbum)}
                    disabled={isLoading}
                    className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen"
                    onClick={() => handleBuyAlbum(album)}
                  >
                    Buy
                  </LoadingButton>
                );
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllAlbums;
