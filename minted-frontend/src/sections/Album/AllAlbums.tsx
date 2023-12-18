import { useState } from 'react';
import { Album } from '@/lib/redux';
import LoadingButton from '@/components/LoadingButton';
import AlbumCard from '@/components/Album/AlbumCard';
import { useFetchAllAlbums } from '@/hooks/useFetchAllAlbums';
import Loader from '@/components/Loader';

const AllAlbums = () => {
  const { loading: loadingAlbums, data: albums } = useFetchAllAlbums();
  const [isLoading, setIsLoading] = useState(false);

  const listenButton = (album: Album) => (
    <LoadingButton
      loading={false}
      disabled={isLoading}
      size="sm"
      className="btn rounded-3 color-000 border-1 border brd-light bg-yellowGreen"
      style={{ padding: '6px 16px' }}
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
          {loadingAlbums ? (
            <Loader />
          ) : (
            <div className="row">
              {(albums || []).map((album, index) => (
                <div key={index} className="col-3">
                  <AlbumCard album={album} actionButton={listenButton} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllAlbums;
