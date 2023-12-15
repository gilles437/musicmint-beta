import React, { useState } from 'react';
import { Album, AlbumMetadata } from '@/lib/redux';
import { useAlbumMetadata } from '@/hooks/useAlbumMetadata';
import LoadingButton from '../LoadingButton';

type Props = {
  album: Album;
  onBuyAlbum: (album: Album) => Promise<boolean>;
};

const AlbumDetail = ({ album, onBuyAlbum }: Props) => {
  const metadata = useAlbumMetadata(album);
  const [loading, setLoading] = useState(false);

  const handleBuyAlbum = async () => {
    setLoading(true);
    await onBuyAlbum(album);
    setLoading(false);
  };

  return (
    <div className="row">
      <div className="col-md-6 col-sm-12">
        <div className="mt-3 album-bottom-border">
          <h2>{metadata?.title}</h2>
        </div>
        <div className="mt-3 album-bottom-border">
          <h5>Price</h5>
          <h4>{metadata?.price} AFT</h4>
          <p>{metadata ? Number(metadata.price) * 0.12 : 0} USD</p>
        </div>
        <div className="mt-3 album-bottom-border">
          <h5>{metadata?.description}</h5>
        </div>
        <div className="mt-3 d-grid">
          <LoadingButton
            loading={loading}
            className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen"
            onClick={handleBuyAlbum}
          >
            Buy Album
          </LoadingButton>
        </div>
      </div>
      <div className="col-md-6 col-sm-12">
        <div>
          <img src={metadata?.image} alt="Album" className="w-100"></img>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetail;
