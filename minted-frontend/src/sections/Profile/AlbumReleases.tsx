import React from 'react';
import { useFetchOwnedAlbums } from '@/hooks/useFetchOwnedAlbums';
import { useSelector } from 'react-redux';
import { Album, selectAlbums } from '@/lib/redux';
import Link from 'next/link';
import { useAlbumMetadata } from '@/hooks/useAlbumMetadata';
import Loader from '@/components/Loader';

type Props = {
  address: string;
};

const AlbumReleases = ({ address }: Props) => {
  const isLoading = useFetchOwnedAlbums(address);
  const albums = useSelector(selectAlbums);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {(albums || []).map((album: Album, index: number) => (
        <AlbumDetail key={index} album={album} index={index} />
      ))}
    </>
  );
};

const AlbumDetail = ({ album, index }: { album: Album; index: number }) => {
  const metadata = useAlbumMetadata(album);

  if (index % 2 === 0) {
    return (
      <div className="row py-5" style={{ borderBottom: '2px solid' }}>
        <div className="col-sm-12 col-md-4">
          <img className="w-100" src={metadata?.image} alt="" />
        </div>
        <div className="col-md-8 col-sm-12">
          <div className="mb-2" style={{ borderBottom: '1px solid' }}>
            <h2>{metadata?.title}</h2>
          </div>
          <div className="mb-2" style={{ borderBottom: '1px solid' }}>
            <p className="word-limit">{metadata?.description}</p>
          </div>
          <div className="mb-2" style={{ borderBottom: '1px solid' }}>
            <h5>{metadata?.price} AFT</h5>
          </div>
          <div className="mb-2">
            <Link href={`/album/detail?contract=${album.contract}&albumId=${album.albumid}`}>
              <button className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen">
                Explore Album
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row mt-3" key={index}>
      <div className="col-sm-12 col-md-8">
        <div className="mb-2" style={{ borderBottom: '1px solid' }}>
          <h2>{metadata?.title}</h2>
        </div>
        <div className="mb-2" style={{ borderBottom: '1px solid' }}>
          <p className="word-limit">{metadata?.description}</p>
        </div>
        <div className="mb-2" style={{ borderBottom: '1px solid' }}>
          <h5>{album.price} AFT</h5>
        </div>
        <div className="mb-2">
          <Link href={`/album/detail?contract=${album.contract}&albumId=${album.albumid}`}>
            <button className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen">
              Explore Album
            </button>
          </Link>
        </div>
      </div>
      <div className="col-md-4 col-sm-12">
        <img className="w-100" src={metadata?.image} alt="" />
      </div>
    </div>
  );
};

export default AlbumReleases;
