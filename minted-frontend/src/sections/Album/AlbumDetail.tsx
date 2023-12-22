import React, { useCallback } from 'react';
import { toast } from 'react-toastify';

import { Album } from '@/lib/redux';
import { useMintAlbum } from '@/hooks/contract/useMintAlbum';
import AlbumDetail from '@/components/Album/AlbumDetail';

type Props = {
  album: Album;
};

const AlbumDetailSection = ({ album }: Props) => {
  const mintAlbum = useMintAlbum();

  const handleBuyAlbum = useCallback(
    async (album: Album) => {
      console.log('handleBuyAlbum', album);
      try {
        const mintedId = await mintAlbum(album.albumid, album.price, album.contract);
        if (mintedId) {
          toast.info('You have successfully minted the album');
          return true;
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
      }

      toast.error(`Something went wrong`);
      return false;
    },
    [mintAlbum]
  );

  return <AlbumDetail album={album} onBuyAlbum={handleBuyAlbum} />;
};

export default AlbumDetailSection;
