import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector, selectAlbums, Album } from '@/lib/redux';
import { useAlbum } from '@/hooks/useAlbum';
import LoadingButton from '@/components/LoadingButton';
import AlbumCard from '@/components/Album/AlbumCard';

const AllAlbums = () => {
  const albums = useSelector(selectAlbums);
  const { mintAlbum } = useAlbum();
  const [selectedAlbum, setSelectedAlbum] = useState<Album>();
  const [isLoading, setIsLoading] = useState(false);

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
      if (err && typeof(err) === 'string') {
        toast.error(err);
        return false;
      }
    } finally {
      setIsLoading(false);
    }

    toast.error(`Something went wrong`);
    return false;
  };

  const listenButton = (album: Album) => (
    <LoadingButton
      loading={!!(isLoading && album == selectedAlbum)}
      disabled={isLoading}
      size="sm"
      className="btn rounded-3 color-000 border-1 border brd-light bg-yellowGreen"
      style={{ padding: '6px 16px' }}
      onClick={() => handleBuyAlbum(album)}
    >
      Listen
    </LoadingButton>
  );

  return (
    <section className="projects section-padding style-12">
      <div className="container">
        <div className="text-center mb-3">
          <h2>All Albums</h2>
        </div>
        <div className="mb-5">
          <div className="row">
            {(albums || []).map((album, index) => (
              <div key={index} className="col-3">
                <AlbumCard album={album} actionButton={listenButton} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllAlbums;
