import { BN } from '@polkadot/util';
import { useCallback } from 'react';
import { selectSoldAlbums, useSelector } from '@/lib/redux';

export const useAlbumStats = () => {
  const soldAlbums = useSelector(selectSoldAlbums);

  const getSoldAlbums = useCallback(
    (contract: string, albumId: number) => {
      if (soldAlbums?.length) {
        return soldAlbums.filter(
          (album) => album.contract === contract && album.albumid === albumId
        );
      }
      return undefined;
    },
    [soldAlbums]
  );

  const getSoldAmount = useCallback(
    (contract: string, albumId: number) => {
      const albums = getSoldAlbums(contract, albumId);
      return albums?.length;
    },
    [getSoldAlbums]
  );

  const getGainAmount = useCallback(
    (contract: string, albumId: number) => {
      const albums = getSoldAlbums(contract, albumId);
      if (albums) {
        const value = albums.reduce((amount, album) => amount.add(new BN(album.price)), new BN(0));
        return value.toString();
      }
      return undefined;
    },
    [getSoldAlbums]
  );

  return {
    getSoldAmount,
    getGainAmount,
  };
};
